#!/bin/bash
echo " Starting compose MINIMAL Stack"

# Sourcing env variables
echo " Sourcing environment variables"
# Because of WSL we need to force convertion of .env file to unix
dos2unix ./env.sh
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

# Minimal dependencies
echo " Starting Traefik"
docker compose up -d traefik
echo " Done."

echo " Starting Keycloak"
docker compose up -d sso
echo " Done."

echo " Starting Kong"
docker compose up -d apim
echo " Done."