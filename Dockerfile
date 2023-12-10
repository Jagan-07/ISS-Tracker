# Use an official Node.js runtime as a base image(check for vulnerabilities)
FROM node:12.18.4-alpine

# Set the working directory in the container
WORKDIR /ISS-Tracker

# Install project dependencies
RUN npm install

# Install npm web server
RUN npm install -g http-server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app will run on
EXPOSE 8080

# Define the command to run your application
CMD [ "http-server" ]
