# Use a base image with Bun installed
FROM node:18 AS builder

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set the environment variable for Bun
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies with Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN bun run build -- --configuration production

# Check the contents of the dist directory
RUN ls -R /app/dist/ct648_finalproject

# Use a lightweight server for serving the Angular app
FROM nginx:alpine

# Ensure the html directory exists
RUN mkdir -p /usr/share/nginx/html

# Check the contents of the NGINX HTML directory
RUN ls -R /usr/share/nginx/html

# Copy the built files from the builder stage to the NGINX HTML directory
# COPY --from=builder /app/dist/ct648_finalproject/. /usr/share/nginx/html/
COPY --from=builder /app/dist/ct648_finalproject/browser/. /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Final check to verify files copied correctly
RUN ls -R /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
