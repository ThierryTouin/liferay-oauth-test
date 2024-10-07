#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache sso
docker stop lfroauth-liferay
docker rm lfroauth-liferay
docker volume rm  lfroauth_liferay_data
docker rmi lfroauth-liferay
docker compose build liferay
docker compose up liferay

