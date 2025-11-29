# Multi-stage build for Production

# Stage 1: Build React frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm install

# Copy all source code
COPY . .

# Build React production bundle
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy server file and any server-side dependencies
COPY server.js ./

# Copy src folder if server.js needs it (for Actions, etc.)
COPY src ./src

# Copy React build from stage 1
COPY --from=build /app/build ./build

# Expose port for server
EXPOSE 5000

# Set memory limit
ENV NODE_OPTIONS="--max_old_space_size=512"
ENV NODE_ENV=production

# Start the production server
CMD ["node", "server.js"]