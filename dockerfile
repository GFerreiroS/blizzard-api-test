# Use Bun image to build and serve
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build Vite app
RUN bun run build

# Expose port
EXPOSE 5173

# Serve the built app
CMD ["bun", "run", "dev", "--host"]
