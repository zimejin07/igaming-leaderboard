# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./
COPY .env ./
COPY . .

# Install deps (includes prisma)
RUN npm install

# Copy everything else
COPY . .

# Generate Prisma client for Linux (inside Docker)
RUN npx prisma generate

# Build Next.js app
RUN npm run build


# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only needed artifacts from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env

# Start app
CMD ["npm", "start"]
