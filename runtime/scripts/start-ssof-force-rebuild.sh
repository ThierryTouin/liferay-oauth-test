#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache ssof
docker compose build ssof
docker compose up ssof

