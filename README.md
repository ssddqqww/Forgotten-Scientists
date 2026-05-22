# Forgotten Scientists

An interactive Next.js platform highlighting overlooked scientists, featuring quizzes,
timelines, maps, secure accounts, and user profiles.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project and run every SQL migration in order from
   `supabase/migrations` in the Supabase SQL editor.

3. Create `.env.local` from `.env.example`:

   ```bash
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   APP_ORIGIN=http://localhost:3000
   ALLOWED_ORIGINS=http://localhost:3000
   ```

   `SUPABASE_SERVICE_ROLE_KEY` must stay server-only. Never expose it as a
   `NEXT_PUBLIC_` variable and never paste it into client-side code.

4. Run the development server:

   ```bash
   npm run dev
   ```

Open http://localhost:3000.

## Auth And Database

The app uses Next.js API routes for signup, login, logout, sessions, and profile
updates. Passwords are salted and hashed with `scrypt`. Browser sessions are stored
in an `httpOnly` cookie, while the database stores only a SHA-256 hash of the session
token.

For Vercel, add the same `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` values in
the project Environment Variables. Also set `APP_ORIGIN` to the production domain
and put any preview domains in `ALLOWED_ORIGINS` as a comma-separated list. SQLite
is intentionally not used in production because Vercel serverless deployments do
not provide a persistent local filesystem.

Before launch, confirm:

- `npm run lint`
- `npm run build`
- `npm audit --omit=dev`
- Supabase migrations are applied.
- Supabase backups are configured for real user data.
