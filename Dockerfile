# Dockerfile
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Expose the API port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
