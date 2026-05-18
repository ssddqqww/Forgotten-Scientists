import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

import type { StoredUser } from "./auth-types";

type UserRow = {
  id: number;
  full_name: string;
  email: string;
  password_hash: string;
  created_at: string;
  username: string | null;
  pronouns: string | null;
  phone: string | null;
  bio: string | null;
  favorite_field: string | null;
  preferred_section: string | null;
};

type SessionRow = {
  user_id: number;
};

type SupabaseRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  query?: Record<string, string | number | boolean | undefined>;
  body?: Record<string, unknown>;
  prefer?: string;
};

export class AuthStorageConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthStorageConfigurationError";
  }
}

class AuthStorageRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AuthStorageRequestError";
    this.status = status;
  }
}

export const SESSION_COOKIE = "forgotten_scientists_session";
const SESSION_DAYS = 30;
export const SESSION_MAX_AGE_SECONDS = SESSION_DAYS * 24 * 60 * 60;

const SELECT_PUBLIC_USER =
  "id,full_name,email,created_at,username,pronouns,phone,bio,favorite_field,preferred_section";
const SELECT_AUTH_USER = `${SELECT_PUBLIC_USER},password_hash`;

const getSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    throw new AuthStorageConfigurationError(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return {
    url: url.replace(/\/+$/, ""),
    serviceRoleKey,
  };
};

const buildSupabaseUrl = (table: string, query?: SupabaseRequestOptions["query"]) => {
  const { url } = getSupabaseConfig();
  const requestUrl = new URL(`/rest/v1/${table}`, url);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) {
      requestUrl.searchParams.set(key, String(value));
    }
  }

  return requestUrl;
};

const supabaseRequest = async <T>(
  table: string,
  options: SupabaseRequestOptions = {}
): Promise<T> => {
  const { serviceRoleKey } = getSupabaseConfig();
  const method = options.method ?? "GET";
  const response = await fetch(buildSupabaseUrl(table, options.query), {
    method,
    cache: "no-store",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message =
      typeof payload.message === "string" ? payload.message : "Supabase request failed.";

    throw new AuthStorageRequestError(response.status, message);
  }

  if (response.status === 204) {
    return null as T;
  }

  const text = await response.text();

  if (!text) {
    return null as T;
  }

  return JSON.parse(text) as T;
};

export const isAuthStorageConfigurationError = (error: unknown) =>
  error instanceof AuthStorageConfigurationError;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const makeUsername = (fullName: string, email: string) => {
  const base =
    fullName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/^\.+|\.+$/g, "") || email.split("@")[0];

  return base.slice(0, 24);
};

const rowToUser = (row: UserRow): StoredUser => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  createdAt: row.created_at,
  username: row.username ?? undefined,
  pronouns: row.pronouns ?? undefined,
  phone: row.phone ?? undefined,
  bio: row.bio ?? undefined,
  favoriteField: row.favorite_field ?? undefined,
  preferredSection: row.preferred_section ?? undefined,
});

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, 64).toString("base64url");

  return `scrypt$${salt}$${hash}`;
};

const verifyPassword = (password: string, storedHash: string) => {
  const [algorithm, salt, hash] = storedHash.split("$");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const expectedHash = Buffer.from(hash, "base64url");
  const actualHash = scryptSync(password, salt, expectedHash.length);

  return expectedHash.length === actualHash.length && timingSafeEqual(expectedHash, actualHash);
};

const hashSessionToken = (token: string) =>
  createHash("sha256").update(token).digest("base64url");

const isDuplicateEmailError = (error: unknown) =>
  error instanceof AuthStorageRequestError && error.status === 409;

export const validateSignupInput = (input: {
  fullName?: unknown;
  email?: unknown;
  password?: unknown;
}) => {
  const fullName = typeof input.fullName === "string" ? input.fullName.trim() : "";
  const email = typeof input.email === "string" ? normalizeEmail(input.email) : "";
  const password = typeof input.password === "string" ? input.password : "";

  if (fullName.length < 2 || fullName.length > 80) {
    return { ok: false as const, message: "Enter your full name." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, message: "Enter a valid email address." };
  }

  if (password.length < 8) {
    return { ok: false as const, message: "Password must be at least 8 characters." };
  }

  if (password.length > 128) {
    return { ok: false as const, message: "Password is too long." };
  }

  return { ok: true as const, fullName, email, password };
};

export const createUser = async (input: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const createdAt = new Date().toISOString();
  const passwordHash = hashPassword(input.password);
  const username = makeUsername(input.fullName, input.email);

  try {
    const rows = await supabaseRequest<UserRow[]>("users", {
      method: "POST",
      query: { select: SELECT_PUBLIC_USER },
      prefer: "return=representation",
      body: {
        full_name: input.fullName,
        email: input.email,
        password_hash: passwordHash,
        created_at: createdAt,
        username,
      },
    });

    return rows[0] ? rowToUser(rows[0]) : null;
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      return null;
    }

    throw error;
  }
};

export const getUserById = async (id: number) => {
  const rows = await supabaseRequest<UserRow[]>("users", {
    query: {
      id: `eq.${id}`,
      select: SELECT_PUBLIC_USER,
      limit: 1,
    },
  });

  return rows[0] ? rowToUser(rows[0]) : null;
};

export const verifyUserLogin = async (email: string, password: string) => {
  const rows = await supabaseRequest<UserRow[]>("users", {
    query: {
      email: `eq.${normalizeEmail(email)}`,
      select: SELECT_AUTH_USER,
      limit: 1,
    },
  });
  const row = rows[0];

  if (!row || !verifyPassword(password, row.password_hash)) {
    return null;
  }

  return rowToUser(row);
};

export const createSession = async (userId: number) => {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000).toISOString();

  await supabaseRequest("sessions", {
    method: "POST",
    prefer: "return=minimal",
    body: {
      user_id: userId,
      token_hash: tokenHash,
      expires_at: expiresAt,
    },
  });

  return { token, expiresAt };
};

export const getUserBySessionToken = async (token?: string) => {
  if (!token) return null;

  const now = new Date().toISOString();

  await supabaseRequest("sessions", {
    method: "DELETE",
    query: { expires_at: `lte.${now}` },
  });

  const sessions = await supabaseRequest<SessionRow[]>("sessions", {
    query: {
      token_hash: `eq.${hashSessionToken(token)}`,
      expires_at: `gt.${now}`,
      select: "user_id",
      limit: 1,
    },
  });
  const session = sessions[0];

  if (!session) {
    return null;
  }

  return getUserById(session.user_id);
};

export const deleteSession = async (token?: string) => {
  if (!token) return;

  await supabaseRequest("sessions", {
    method: "DELETE",
    query: { token_hash: `eq.${hashSessionToken(token)}` },
  });
};

export const updateUserProfile = async (
  userId: number,
  updates: Partial<
    Pick<
      StoredUser,
      "fullName" | "username" | "pronouns" | "phone" | "bio" | "favoriteField" | "preferredSection"
    >
  >
) => {
  const currentUser = await getUserById(userId);

  if (!currentUser) {
    return null;
  }

  const fullName = updates.fullName?.trim();

  if (fullName !== undefined && (fullName.length < 2 || fullName.length > 80)) {
    return null;
  }

  const body: Record<string, string | null> = {};

  if (fullName !== undefined) body.full_name = fullName;
  if (updates.username !== undefined) body.username = updates.username.trim() || null;
  if (updates.pronouns !== undefined) body.pronouns = updates.pronouns || null;
  if (updates.phone !== undefined) body.phone = updates.phone.trim() || null;
  if (updates.bio !== undefined) body.bio = updates.bio || null;
  if (updates.favoriteField !== undefined) body.favorite_field = updates.favoriteField || null;
  if (updates.preferredSection !== undefined) {
    body.preferred_section = updates.preferredSection || null;
  }

  if (Object.keys(body).length === 0) {
    return currentUser;
  }

  const rows = await supabaseRequest<UserRow[]>("users", {
    method: "PATCH",
    query: {
      id: `eq.${userId}`,
      select: SELECT_PUBLIC_USER,
    },
    prefer: "return=representation",
    body,
  });

  return rows[0] ? rowToUser(rows[0]) : null;
};
