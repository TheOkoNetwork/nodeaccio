# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm install -g verdaccio

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "verdaccio","--config","config.cloudrun.yml" ]