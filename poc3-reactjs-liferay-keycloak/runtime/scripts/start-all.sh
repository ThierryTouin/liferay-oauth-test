#!/bin/bash
echo " Starting compose Stack"

# Starting all container
./start-apps-dependencies.sh

# Sourcing env variables
echo " Sourcing environment variables"
# Because of WSL we need to force convertion of .env file to unix
dos2unix ./env.sh
source ./env.sh
echo " Done."

cd ..

echo " Starting Apps"
docker compose up -d apps
echo " Done."

./scripts/spinner.sh sleep 5s

echo " Starting Liferay"
docker compose up -d portal
echo " Done."

./scripts/spinner.sh sleep 3s

echo " Installing Liferay license from $LFR_LICENSE_FILE_PATH to Liferay container"
./scripts/install-licence.sh $LFR_LICENSE_FILE_PATH
echo " Done."