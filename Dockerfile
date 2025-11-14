# Stage 1: Builder
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code and build
COPY . .
RUN bun run build

# Stage 2: Production
FROM oven/bun:1-alpine AS production
WORKDIR /app

# Install production dependencies only
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy compiled binary from builder stage
COPY --from=builder /app/server .

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Health check (adapts to PORT environment variable)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun run --eval "fetch('http://localhost:${PORT:-3000}/health').then(r=>process.exit(r.ok?0:1)).catch(e=>process.exit(1))"

# Expose port (uses PORT from env or defaults to 3000)
EXPOSE ${PORT:-3000}

# Run the compiled binary
CMD ["./server"]