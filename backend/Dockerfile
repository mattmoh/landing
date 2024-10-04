FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app files
COPY . .

# Expose the port your Node.js app listens on
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]