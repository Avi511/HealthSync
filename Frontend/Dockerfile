FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --network-timeout=1000000

# Copy the rest of the frontend code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite development server and expose it to the host network
CMD ["npm", "run", "dev", "--", "--host"]
