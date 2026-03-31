# Base Image
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set working directory
WORKDIR /test

# Copy test files and configuration
COPY . .

# Run tests

CMD ["npx", "playwright", "test", "--project=e2e-smoke"]

