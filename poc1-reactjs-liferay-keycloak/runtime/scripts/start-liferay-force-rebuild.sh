#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache sso
docker stop lfroauth-portal
docker rm lfroauth-portal
docker volume rm  lfroauth_liferay_data
docker rmi lfroauth-portal
docker compose build liferay
docker compose up liferay

