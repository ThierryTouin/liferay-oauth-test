#!/bin/bash
echo " Starting compose Stack"

# Sourcing env variables
echo " Sourcing environment variables"
source ./env.sh
echo " Done."

# Creating missing network if needed
echo " Creating missing ressources"
NETWORK="devnet"
if docker network inspect ${NETWORK} > /dev/null 2>&1
then
    echo "Network '${NETWORK}' already exists"
else
    echo "Network '${NETWORK}' doesn't exist; creating it"
    docker network create ${NETWORK} > /dev/null
fi
echo " Done."

cd ..

# Starting all container
echo " Starting MySQL"
docker compose up -d db
echo " Done."

echo " Starting Keycloak"
docker compose up -d sso
echo " Done."

echo " Starting Kong"
docker compose up -d apim
echo " Done."

echo " Starting Traefik"
docker compose up -d traefik
echo " Done."

echo " Starting App1"
docker compose up -d app1
echo " Done."

./scripts/spinner.sh sleep 180s

echo " Starting Liferay"
docker compose up -d liferay
echo " Done."

echo " Installing Liferay license from $LFR_LICENSE_FILE_PATH to Liferay container"
./scripts/install-licence.sh $LFR_LICENSE_FILE_PATH
echo " Done."