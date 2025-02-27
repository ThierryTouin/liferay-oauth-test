#!/bin/bash

RED=`tput setaf 1`
GREEN=`tput setaf 2`
BOLD=$(tput bold)
NC=`tput sgr0` # Reset color

# Exit on error
set -e

# Track last executed command for error tracing
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'if [ $? -ne 0 ]; then echo "${RED}\"${last_command}\" command failed with exit code $?${NC}"; fi' EXIT


function manual() {
    echo "${BOLD}Available commands:${NC}"
    echo "  clean <path>    : Clean Liferay workspace."
    echo "  deploy <path>   : Deploy to Liferay runtime."
    echo "  build <path>    : Build all modules available in workspace."
}

function clean() {

    echo "${GREEN}Starting cleanup ${NC}"

    cd ../
    ./gradlew clean

    echo "${GREEN}Cleanup completed.${NC}"

}

function deploy() {

    echo "${GREEN}Starting deploy ${NC}"

    destination=../../../runtime/liferay/deploy

    widget_home=../build

    IFS=$'\n'
    for i in $(find $widget_home/* -name 'poc3*.zip' -not -path '*node_modules*'  );
    do
        echo "Copying $i to $destination"		
        cp -f $i $destination

    done
    unset IFS

    IFS=$'\n'
    for i in $(find $widget_home/* -name 'poc3*.jar' -not -path '*node_modules*'  );
    do
        echo "Copying $i to $destination"		
        cp -f $i $destination

    done
    unset IFS

    chmod -R 777 $destination/*

    echo "${GREEN}deploy completed.${NC}"
}

function build() {

    echo "${GREEN}Starting build ${NC}"

    cd ../
    ./gradlew clean deploy

    echo "${GREEN}Build completed.${NC}"
}

if [ $# -eq 0 ]; then
    manual
    exit 0
fi

case "$1" in
    "clean")
        clean "$2"
        ;;
    "build")
        build "$2" "$3"
        ;;
    "deploy")
        deploy "$2"
        ;;
    *)
        echo "${RED}Unknown command: $1${NC}"
        manual
        ;;
esac
