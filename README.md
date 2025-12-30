# Operations Command Center SaaS

A production-grade, multi-tenant SaaS application for managing Clients, Projects, Tasks, and Invoices.

## Tech Stack
- **Monorepo**: Turborepo
- **Frontend**: Next.js 14+ (App Router), TailwindCSS
- **Backend**: NestJS, Prisma, PostgreSQL
- **Infrastructure**: Docker (Postgres, Redis)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Environment Setup**
   Copy `.env.example` to `.env` and configure your Database URL.

3. **Database Migration**
   ```bash
   # Generate Prisma Client
   cd packages/database
   npx prisma generate
   # Push Schema to DB (requires Postgres running)
   npx prisma db push
   ```

4. **Run Development**
   ```bash
   npm run dev
   ```

## Features
- **Authentication**: Multi-tenant login/signup.
- **CRM**: Client management.
- **Operations**: Kanban board for projects.
- **Finance**: Invoicing with mock Stripe integration.
- **Automation**: Daily overdue invoice reminders.

## Documentation
See `docs/rnd_master_brief.md` for R&D context and `docs/ADR.md` for architectural decisions.
