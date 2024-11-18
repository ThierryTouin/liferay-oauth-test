#!/bin/bash
echo " Start"
cd ..

docker stop lfroauth-apim

docker compose down --volumes --rmi all --remove-orphans lfroauth-apim

docker compose build apim
docker compose up apim

