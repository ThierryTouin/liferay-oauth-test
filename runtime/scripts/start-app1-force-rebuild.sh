#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache app1
docker compose build app1
docker compose up app1

