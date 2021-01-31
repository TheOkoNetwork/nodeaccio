# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm install -g verdaccio verdaccio-google-cloud

# Copy local code to the container image.
COPY . ./

RUN npm install --prefix plugins/verdaccio-gcpip/

RUN echo $GOOGLE_CLOUD_VERDACCIO_KEY_BASE64|base64 -d > gcp_key.json

# Run the web service on container startup.
CMD [ "verdaccio","--config","config.cloudrun.yml" ]