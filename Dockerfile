# Use official Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files and install deps
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
