# OpsBoard

A team project management tool — think lightweight Jira or Linear. Create projects, track tickets, assign work to team members, and keep a log of what happened. Built as a learning project to get hands-on with a modern full-stack TypeScript setup.

Still early. The backend foundation is mostly in place; the frontend is being built out.

---

## Stack

- **Next.js 16** (App Router) — React framework with file-based routing and server components
- **React 19** — latest stable with concurrent features
- **TypeScript** — strict throughout
- **Tailwind CSS v4** — utility-first styling
- **Drizzle ORM** — type-safe SQL with a schema-first approach
- **PostgreSQL** — relational database
- **Better Auth** — authentication with email/password and session management
- **Zod** — schema validation at the API layer
- **shadcn/ui + Base UI** — accessible component primitives

---

## What's in it

- User auth — register, login, sessions via Better Auth
- Projects — create and manage projects with slugs, active/archived status
- Project members — roles per project: owner, member, viewer
- Tickets — full lifecycle: open, in progress, in review, done, cancelled; priority levels low through critical
- Comments on tickets
- Activity logs — tracks actions across tickets, projects, and comments

---

## Getting started

You'll need Node.js 20+ and a running PostgreSQL instance.

```bash
# install dependencies
npm install

# copy and fill in env vars
cp .env.example .env

# run migrations and start dev server
npm run dev
```

Migrations run automatically on `npm run build`. To run them manually:

```bash
npm run db:migrate
```

To browse the database visually:

```bash
npm run db:studio
```

---

## Environment variables

See [.env.example](.env.example) for the full list. At minimum you need a Postgres connection string, a `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.

---

## Status

Early stages. Database schema and auth are working. API routes for projects and tickets are stubbed. Frontend is being built out.
