#!/bin/bash
echo " Start"
cd ..
docker compose build --no-cache mkcert
docker compose up mkcert

