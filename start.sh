#!/bin/bash

echo $GOOGLE_CLOUD_VERDACCIO_KEY_BASE64|base64 -d > ./gcp_key.json
echo "key is"
cat gcp_key.json
echo "Starting"
verdaccio --config config.cloudrun.yml