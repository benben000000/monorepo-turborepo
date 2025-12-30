FROM node:18-alpine AS base

# Prune
FROM base AS prune
WORKDIR /app
# Install turbo
RUN npm install -g turbo
COPY . .
# Generate a pruned version of the workspace (isolating the api app)
RUN turbo prune --scope=api --docker

# Installer
FROM base AS installer
WORKDIR /app

# Add lockfile and package.json's of isolated subworkspace
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/package-lock.json ./package-lock.json

# Install dependencies (including dev deps for build)
RUN npm install

# Copy source code of isolated subworkspace
COPY --from=prune /app/out/full/ .

# Generate Prisma Client (requires schema)
RUN npx prisma generate

# Build the project
RUN npx turbo run build --filter=api...

# Runner
FROM base AS runner
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /app .

# Expose port
EXPOSE 3001

# Start command
CMD ["node", "apps/api/dist/main"]
