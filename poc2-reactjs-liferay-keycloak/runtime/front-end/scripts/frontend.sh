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

# Utility function to find all directories containing package.json, excluding node_modules and build directories
function find_package_dirs() {
    local path=$1
    find "$path" -type f -name "package.json" ! -path "*/node_modules/*" ! -path "*/build/*" -exec dirname {} \;
}

function manual() {
    echo "${BOLD}Available commands:${NC}"
    echo "  clean <path>    : Deletes 'node_modules', 'build', and 'package-lock.json' in directories with a package.json."
    echo "  install <path>  : Executes 'npm install --no-cache' in directories with a package.json."
    echo "  build <path>    : Deletes 'dist' and executes 'npm run build' in directories with a package.json."
    echo "  rebuild <path>  : Executes install and build  "
    echo "  refresh <path>  : Executes clean,  install and build  "
    echo "  help            : Displays this help message."
}


function rebuild() {
    if [ -z "$1" ]; then
        echo "${RED}Error: Path argument is required for the refresh command.${NC}"
        echo "Usage: ./frontend.sh refresh <path>"
        exit 1
    fi

    path=$1
    echo "${GREEN}Starting rebuild in path: $path${NC}"

    install ../ && build ../

    echo "${GREEN}Rebuild completed.${NC}"
}

function refresh() {
    if [ -z "$1" ]; then
        echo "${RED}Error: Path argument is required for the refresh command.${NC}"
        echo "Usage: ./frontend.sh refresh <path>"
        exit 1
    fi

    path=$1
    echo "${GREEN}Starting refresh in path: $path${NC}"

    clean ../ && rebuild ../

    echo "${GREEN}Refresh completed.${NC}"
}

function clean() {
    if [ -z "$1" ]; then
        echo "${RED}Error: Path argument is required for the clean command.${NC}"
        echo "Usage: ./frontend.sh clean <path>"
        exit 1
    fi

    path=$1
    echo "${GREEN}Starting cleanup in path: $path${NC}"

    find_package_dirs "$path" | while read -r project_dir; do
        echo "${BOLD}Cleaning in: $project_dir${NC}"

        if [ -d "$project_dir/node_modules" ]; then
            echo "  Removing node_modules..."
            rm -rf "$project_dir/node_modules"
        fi

        if [ -d "$project_dir/build" ]; then
            echo "  Removing build..."
            rm -rf "$project_dir/build"
        fi

        if [ -f "$project_dir/package-lock.json" ]; then
            echo "  Removing package-lock.json..."
            rm -f "$project_dir/package-lock.json"
        fi
    done

    echo "${GREEN}Cleanup completed.${NC}"
}

function install() {
    if [ -z "$1" ]; then
        echo "${RED}Error: Path argument is required for the install command.${NC}"
        echo "Usage: ./frontend.sh install <path>"
        exit 1
    fi

    path=$1
    echo "${GREEN}Starting npm install in path: $path${NC}"

    find_package_dirs "$path" | while read -r project_dir; do
        echo "${BOLD}Installing in: $project_dir${NC}"

        (cd "$project_dir" && npm install --no-cache)
    done

    echo "${GREEN}npm install completed.${NC}"
}

function build() {
    if [ -z "$1" ]; then
        echo "${RED}Error: Path argument is required for the build command.${NC}"
        echo "Usage: ./frontend.sh build <path>"
        exit 1
    fi

    path=$1
    echo "${GREEN}Starting build in path: $path${NC}"

    find_package_dirs "$path" | while read -r project_dir; do
        echo "${BOLD}Building in: $project_dir${NC}"

        if [ -d "$project_dir/dist" ]; then
            echo "  Removing dist folder..."
            rm -rf "$project_dir/dist"
        fi

        (cd "$project_dir" && npm run build)
    done

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
    "install")
        install "$2"
        ;;
    "build")
        build "$2"
        ;;
    "rebuild")
        rebuild "$2"
        ;;
    "refresh")
        refresh "$2"
        ;;
    "help")
        manual
        ;;
    *)
        echo "${RED}Unknown command: $1${NC}"
        manual
        ;;
esac
