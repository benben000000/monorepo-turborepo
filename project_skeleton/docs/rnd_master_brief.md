# R&D Master Brief

## 1. Domain Overview & Strategy
**Goal**: Create a "Command Center" that replaces disjointed tools (ClickUp + Invoicing + CRM) for small agencies.
**Key Differentiator**: "Polished, broadly effective, not overly complex." Focus on the *integration* of these 3 pillars.

## 2. Technical Architecture Consensus
### Monorepo Structure (Turborepo)
- `apps/web`: Next.js 14+ (App Router). Rendering: Server Components for dashboards, Client Components for interactive Boards.
- `apps/api`: NestJS. Strict typing, DTOs, Zod validation.
- `packages/database`: Prisma ORM schema shared by both (or just API if using strict separation).

### Multi-tenancy Strategy
- **Discriminator Column**: Every table (except `Tenant` and global `User` if shared) gets `tenantId`.
- **Enforcement**:
    - **NestJS**: Global Interceptor/Guard to extract `tenantId` from JWT.
    - **Prisma**: Middleware or custom service wrapper to *always* inject `where: { tenantId }`.
    - **Postgres RLS**: Implementation complexity is higher but safer. For this MVP/Project, Application-level enforcement via Repository Pattern is sufficient and easier to migrate. *Decision: Application-level w/ Middleware safety net.*

### Authentication
- JWT approach.
- User belongs to Tenant(s). Token contains `sub` (userId) and `tid` (current tenantId).
- Switching tenants = Re-issue token or swap context in frontend.

## 3. UI/UX Strategy
- **Aesthetics**: "Linear-app" style or "Vercel" style. Clean, high contrast, minimal noise.
- **Navigation**: Sidebar for main modules (Dashboard, Clients, Projects, Invoices).
- **Dashboard**: High-density data cards (KPIs) + Graphical charts (Recharts).

## 4. Risks & Unknowns
- **Stripe Integration**: Handling Webhooks in a local dev environment requires proxy (stripe-cli).
- **Email Delivery**: Use a mock service (Ethereal/Mailhog) for dev, SendGrid/Resend for prod.
- **Background Jobs**: Redis dependency? If avoiding Redis for simplicity, can use in-memory for dev, but `BullMQ` + Redis is "Production Grade". *Decision: Use BullMQ + Redis container.*

## 5. Recommended Roadmap
1. **Skeleton & Monorepo**: Set up Turbo, ESLint, Prettier.
2. **Postgres & Docker**: Get DB and Redis running.
3. **Auth & Tenant**: The critical foundation.
4. **Vertical Slices**: Client -> Project -> Invoice.
