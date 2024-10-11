#!/bin/bash
echo " Start"
cd ..

#docker compose up
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

echo " Installation Liferay licence"
./scripts/install-licence.sh "/mnt/c/Soft/_binaries/Liferay/activation-key-dxpdevelopment-7.4-developeractivationkeys.xml"  