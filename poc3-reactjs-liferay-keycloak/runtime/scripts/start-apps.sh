#!/bin/bash
echo " Starting compose Stack"

# Starting all container
./start-apps-dependencies.sh

# Sourcing env variables
echo " Sourcing environment variables"
# Because of WSL we need to force convertion of .env file to unix
dos2unix ./env.sh
source ./env.sh
echo " Done."

cd ..

echo " Starting Apps"
docker compose up -d apps
echo " Done."