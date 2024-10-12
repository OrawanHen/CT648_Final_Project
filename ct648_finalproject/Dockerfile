# Use a newer Node.js runtime as a parent image
FROM node:18

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set Bun to the PATH
ENV PATH="/root/.bun/bin:$PATH"

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json (or bun.lockb) to the working directory
COPY ./package*.json ./bun.lockb* ./

# Install dependencies using Bun
RUN bun install

# Copy the remaining application files to the working directory
COPY . .

# Expose port 4200 for the application
EXPOSE 4200

# Start the application using Bun, with host check disabled
CMD ["bun", "run", "ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
