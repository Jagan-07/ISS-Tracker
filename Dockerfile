# Use an official Node.js runtime as a base image(check for vulnerabilities)
FROM node:12.18.4-alpine

# Set the working directory in the container
WORKDIR /ISS-Tracker

# Copy the rest of the application code to the working directory
COPY . .

# Install project dependencies
RUN npm install

# Expose the port your app will run on
EXPOSE 8000

# Define the command to run your application
CMD [ "npm", "start" ]
