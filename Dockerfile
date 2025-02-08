# Base image with Node.js
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the entire project (including Astro config and assets)
COPY . .

# If your portfolio template uses environment variables, you may need to set them here
# Example: ENV SITE_URL=https://yourdomain.com

# Build the static site
RUN npm run build

# Use Nginx to serve the built site
FROM nginx:alpine AS production

# Copy built site from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
