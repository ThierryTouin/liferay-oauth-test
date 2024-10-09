#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache sso
docker compose build sso
docker compose up sso

