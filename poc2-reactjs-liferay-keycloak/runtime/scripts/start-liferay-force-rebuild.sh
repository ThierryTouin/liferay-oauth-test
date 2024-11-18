#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache sso
docker stop lfroauth-portal

docker compose down --volumes --rmi all --remove-orphans lfroauth-portal

docker compose build portal
docker compose up portal

