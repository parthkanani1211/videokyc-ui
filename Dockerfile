# Use an appropriate base image
FROM <base-image>

# Set the working directory
WORKDIR /app

# Copy the Jenkinsfile into the container
COPY Jenkinsfile .

# Install any dependencies required
RUN apt-get update && apt-get install -y <dependency-package>

# Copy the project files into the container
COPY . .

# Build stage
FROM <build-base-image> as build
WORKDIR /app

# Install project dependencies
RUN yarn installwebui

# Build the project
RUN yarn buildwebui

# Deploy stage
FROM <deploy-base-image>
WORKDIR /var/www/videokycui

# Copy the built files from the build stage
COPY --from=build /app/web-ui/build .

# Clean up any unwanted files
RUN rm -rf <unwanted-files>

# Expose the necessary ports
EXPOSE <port>

# Define the command to run the container
CMD ["<command-to-run>"]

