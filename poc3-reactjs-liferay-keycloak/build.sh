#!/bin/bash

script_dir=$(dirname "$(readlink -f "$0")")

# Building runtime 
cd ./runtime/scripts 
./build.sh 
cd "$script_dir"

# Building Liferay plugins
cd ./sources/liferay-workspace/scripts
pwd
./liferay.sh rebuild 
cd "$script_dir"