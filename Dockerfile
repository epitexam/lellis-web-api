# Étape 1: Build
FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Étape 2: Production
FROM oven/bun:1-alpine AS production
WORKDIR /app

# Installation uniquement des dépendances de production
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copie du binaire compilé
COPY --from=builder /app/server .

# Sécurité : utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# # Santé de l'application
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD bun run --eval "fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(e=>process.exit(1))"

# EXPOSE 3000

# Utilisation du binaire compilé (beaucoup plus rapide)
CMD ["./server"]