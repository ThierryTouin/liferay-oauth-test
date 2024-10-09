#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache traefik
docker compose build traefik
docker compose up traefik

