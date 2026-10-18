# Multi-stage Dockerfile for NestJS API Service
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code and Prisma schema
COPY src ./src
COPY ../prisma ./prisma

# Generate Prisma Client & compile TypeScript
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy compiled code, Prisma engine & prod dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

USER node

CMD ["node", "dist/main"]
