#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache app1
docker stop lfroauth-app1

docker compose down --volumes --rmi all --remove-orphans lfroauth-app1

docker compose build app1
docker compose up app1

