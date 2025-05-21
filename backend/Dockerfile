# Use official Node.js image
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend source files
COPY . .

# Expose the backend port (adjust if your backend uses another port)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
