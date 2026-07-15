# Use Microsoft's official Playwright image
FROM mcr.microsoft.com/playwright:v1.55.0-noble

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci

# Copy project files
COPY . .

# Run Playwright tests
CMD ["npx", "playwright", "test"]