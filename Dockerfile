FROM node:18-alpine AS builder

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build the app
COPY . .
COPY ./public /app/public
COPY ./src /app/src
RUN npm run build

# Create the final image
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]