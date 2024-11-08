#!/bin/bash
echo " Start"
cd ..

docker compose down --volumes --rmi all --remove-orphans --service-ports lfroauth-sso

docker compose build sso
docker compose up sso

