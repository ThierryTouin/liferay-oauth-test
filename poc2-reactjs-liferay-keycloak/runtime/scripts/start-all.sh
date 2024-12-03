#!/bin/bash
echo " Starting compose Stack"

# Starting all container
./start-minimal.sh

echo " Starting App1"
docker compose up -d app1
echo " Done."

echo " Starting App2"
docker compose up -d app2
echo " Done."

./scripts/spinner.sh sleep 5s

echo " Starting Liferay"
docker compose up -d portal
echo " Done."

./scripts/spinner.sh sleep 3s

echo " Installing Liferay license from $LFR_LICENSE_FILE_PATH to Liferay container"
./scripts/install-licence.sh $LFR_LICENSE_FILE_PATH
echo " Done."