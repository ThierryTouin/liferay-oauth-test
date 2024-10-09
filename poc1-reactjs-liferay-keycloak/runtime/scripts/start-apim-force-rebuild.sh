#!/bin/bash
echo " Start"
cd ..
#docker compose build --no-cache apim
docker compose build apim
docker compose up apim

