# Stage 1: Install dependencies
FROM node:21.6.2-alpine AS deps

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:21.6.2-alpine AS builder

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY .env .env
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:21.6.2-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY .env .env
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/main"]
