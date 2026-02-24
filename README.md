# APD Administration Portal

Abilene Police Department internal administration system built with Next.js 15 (App Router), TypeScript, and Supabase.

---

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Auth + Database**: Supabase
- **Styling**: CSS-in-JSX (no Tailwind dependency needed)
- **Fonts**: Rajdhani (display) + Roboto Condensed (body)

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Supabase project
Go to [supabase.com](https://supabase.com) and create a new project.

### 3. Run the database schema
In your Supabase dashboard → SQL Editor, paste and run the contents of `supabase-schema.sql`.

### 4. Configure environment variables
```bash
cp .env.local.example .env.local
```
Fill in your Supabase URL and anon key from: Project Settings → API.

### 5. Run the dev server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Creating Your First Admin

1. Sign up through the login page (or create a user in Supabase Auth dashboard)
2. In Supabase SQL Editor, run:
```sql
update public.profiles set role = 'admin' where email = 'your@email.com';
```

---

## Project Structure

```
apd-portal/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Redirects to /login
│   ├── globals.css         # Global styles + APD theme variables
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── dashboard/
│   │   ├── layout.tsx      # Protected layout (auth check)
│   │   └── page.tsx        # Dashboard home
│   └── auth/
│       └── callback/
│           └── route.ts    # Supabase auth callback
├── components/
│   ├── APDBadge.tsx        # SVG badge/shield component
│   └── DashboardSidebar.tsx
├── lib/
│   ├── supabase.ts         # Browser client
│   └── supabase-server.ts  # Server client
├── types/
│   └── index.ts            # UserProfile, UserRole types
├── middleware.ts            # Route protection
└── supabase-schema.sql     # Database schema
```

---

## User Roles

| Role | Description |
|------|-------------|
| `admin` | Full system access |
| `supervisor` | Team management |
| `officer` | Standard access |
| `dispatcher` | Dispatch-specific access |

---

## Adding Features

This portal is built to grow. To add a new module:

1. Create `app/dashboard/[module]/page.tsx`
2. Add a nav item to `DashboardSidebar.tsx`
3. Create tables + RLS policies in `supabase-schema.sql`
4. Build your feature!
