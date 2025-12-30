# Architecture Decision Records (ADR)

## 001. Monorepo Structure
**Decision**: Use Turborepo with pnpm/npm.
**Context**: Need to manage Backend (NestJS) and Frontend (Next.js) in a single repository with shared types.
**Consequences**: Unified tooling, shared `packages/database`.

## 002. Multi-tenancy
**Decision**: Column-based tenant isolation (`tenantId`).
**Context**: Simple enough for MVP, easier to manage than schema-based isolation.
**Consequences**: All queries must filter by `tenantId`. Enforced via Service logic (and potentially Middleware/Guards).

## 003. Authentication
**Decision**: JWT with Passport.
**Context**: Stateless authentication required for scalability.
**Consequences**: Token contains `sub` (User ID) and `tid` (Tenant ID).

## 004. Database & ORM
**Decision**: PostgreSQL + Prisma.
**Context**: Type-safe database access and robust relational model.
**Consequences**: Requires `prisma generate`.

## 005. Automation
**Decision**: `@nestjs/schedule` (Cron) instead of BullMQ.
**Context**: Simplifies deployment (no Redis required for basic cron) and sufficient for MVP "Daily Reminders".
**Consequences**: Jobs run on the API instance. if scaled horizontally, need locking (e.g. redis lock) to avoid duplicate emails. Accepted for MVP.
