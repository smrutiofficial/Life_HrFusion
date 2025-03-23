# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Set Node.js environment
ENV NODE_ENV=production
ENV NODE_PATH=/app

# Install dependencies (including dev dependencies for Tailwind/PostCSS)
COPY package.json package-lock.json ./
RUN npm install --omit=optional

# Copy source files
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set Next.js to production mode
ENV NODE_ENV=production
ENV NODE_PATH=/app

# Expose Next.js port
EXPOSE 3000

# Run Next.js in production
CMD ["npx", "next", "start"]
