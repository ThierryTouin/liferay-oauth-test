#!/bin/bash
echo " Start"
cd ..
docker compose build --no-cache gencert
docker compose up gencert

