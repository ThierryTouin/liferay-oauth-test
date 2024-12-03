#!/bin/bash
echo " Start"
cd ..

docker stop lfroauth-app2

docker compose down --volumes --rmi all --remove-orphans lfroauth-app2

docker compose build app2
docker compose up app2

