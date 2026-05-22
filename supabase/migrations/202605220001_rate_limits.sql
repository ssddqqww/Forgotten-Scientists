create table if not exists public.rate_limits (
  scope text not null check (char_length(scope) between 1 and 80),
  subject_hash text not null check (char_length(subject_hash) between 32 and 128),
  count integer not null default 0 check (count >= 0),
  reset_at timestamptz not null,
  updated_at timestamptz not null default now(),
  primary key (scope, subject_hash)
);

create index if not exists rate_limits_reset_at_idx on public.rate_limits(reset_at);

alter table public.rate_limits enable row level security;

revoke all on table public.rate_limits from anon, authenticated;
grant all on table public.rate_limits to service_role;

create or replace function public.consume_rate_limit(
  p_scope text,
  p_subject_hash text,
  p_max_attempts integer,
  p_window_seconds integer
)
returns table(allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_window interval;
  v_count integer;
  v_reset_at timestamptz;
begin
  if p_scope is null or btrim(p_scope) = '' then
    raise exception 'Rate limit scope is required.';
  end if;

  if p_subject_hash is null or btrim(p_subject_hash) = '' then
    raise exception 'Rate limit subject is required.';
  end if;

  if p_max_attempts < 1 or p_window_seconds < 1 then
    raise exception 'Invalid rate limit configuration.';
  end if;

  v_window := make_interval(secs => p_window_seconds);

  if random() < 0.01 then
    delete from public.rate_limits
    where reset_at < v_now - interval '1 day';
  end if;

  insert into public.rate_limits as rl (
    scope,
    subject_hash,
    count,
    reset_at,
    updated_at
  )
  values (
    p_scope,
    p_subject_hash,
    1,
    v_now + v_window,
    v_now
  )
  on conflict (scope, subject_hash) do update
    set count = case
      when rl.reset_at <= v_now then 1
      else rl.count + 1
    end,
    reset_at = case
      when rl.reset_at <= v_now then v_now + v_window
      else rl.reset_at
    end,
    updated_at = v_now
  returning rl.count, rl.reset_at into v_count, v_reset_at;

  allowed := v_count <= p_max_attempts;
  retry_after_seconds := greatest(0, ceil(extract(epoch from (v_reset_at - v_now)))::integer);

  return next;
end;
$$;

revoke all on function public.consume_rate_limit(text, text, integer, integer) from public;
grant execute on function public.consume_rate_limit(text, text, integer, integer) to service_role;

comment on table public.rate_limits is
  'Hashed rate-limit counters for auth and profile endpoints.';
