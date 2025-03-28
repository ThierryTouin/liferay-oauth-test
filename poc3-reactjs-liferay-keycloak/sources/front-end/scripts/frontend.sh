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

current_script_dir=$(dirname "$(readlink -f "$0")")

# Utility function to find all directories containing package.json, excluding node_modules and build directories
function find_package_dirs() {
    local path=$1
    find "$path" -type f -name "package.json" ! -path "*/node_modules/*" ! -path "*/build/*" -exec dirname {} \;
}

function manual() {
    echo "${BOLD}Available commands:${NC}"
    echo "  clean <path>    : Deletes 'node_modules', 'build', and 'package-lock.json' in directories with a package.json."
    echo "  npmInstall <path>  : Executes 'npm install --no-cache' in directories with a package.json."
    echo "  build <path>    : Deletes existing output folder and executes 'npm run build' in all directories containing a package.json. Usage: ./frontend.sh build <path> [module]"
    echo "  rebuild <path>  : Build all apps cleaning output directory before"
    echo "  refresh <path>  : Executes clean, install and build  "
    echo "  help            : Displays this help message."
}

function rebuild() {
    
    if [ -z "$2" ]; then
        echo "${RED}Error: Path argument is required for the refresh command.${NC}"
        echo "Usage: ./frontend.sh rebuild <path>"
        exit 1
    fi

    path=$2

    echo "${GREEN}Starting rebuild in path: $path${NC}"

    cleanOutput "$@" && build "$@"

    echo "${GREEN}Rebuild completed.${NC}"
}

function refresh() {
    if [ -z "$2" ]; then
        echo "${RED}Error: Path argument is required for the refresh command.${NC}"
        echo "Usage: ./frontend.sh refresh <path>"
        exit 1
    fi

    path=$2
    echo "${GREEN}Starting refresh in path: $path ${NC}"

    clean "$@" && npmInstall "$@" && build "$@"

    echo "${GREEN}Refresh completed.${NC}"
}

function cleanNodeModule() {
    if [ -z "$2" ]; then
        echo "${RED}Error: Path argument is required for the clean command.${NC}"
        echo "Usage: ./frontend.sh clean <path>"
        exit 1
    fi

    path=$2
    echo "${GREEN}Starting cleanup INSTALLATION in path: $path ${NC}"

    find_package_dirs "$path" | while read -r project_dir; do
        echo "${BOLD}Cleaning in: $project_dir${NC}"

        if [ -d "$project_dir/node_modules" ]; then
            echo "  Removing node_modules..."
            rm -rf "$project_dir/node_modules"
        fi

        if [ -f "$project_dir/package-lock.json" ]; then
            echo "  Removing package-lock.json..."
            rm -f "$project_dir/package-lock.json"
        fi
    done

    echo "${GREEN}Cleanup of INSTALLATION completed.${NC}"
}

function cleanOutput() {
    if [ -z "$2" ]; then
        echo "${RED}Error: Path argument is required for the clean command.${NC}"
        echo "Usage: ./frontend.sh clean <path>"
        exit 1
    fi

    path=$2
    echo "${GREEN}Starting cleanup BUILD in path: $path ${NC}"

    find_package_dirs "$path" | while read -r project_dir; do
        echo "${BOLD}Cleaning in: $project_dir${NC}"

        if [ -d "$project_dir/build" ]; then
            echo "  Removing build..."
            rm -rf "$project_dir/build"
        fi

    done

    echo "${GREEN}Cleanup BUILD completed.${NC}"
}

function clean() {

    path=$2
    echo "${GREEN}Starting cleanup in path: $path ${NC}"

    cleanNodeModule "$@" && cleanOutput "$@"

    echo "${GREEN}Cleanup completed.${NC}"
}

function npmInstall() {
    if [ -z "$2" ]; then
        echo "${RED}Error: Path argument is required for the clean command.${NC}"
        echo "Usage: ./frontend.sh clean <path>"
        exit 1
    fi

    path=$2
    echo "${GREEN}Starting npm install in path: $path"

    cd "$path"

    npm install

    cd "$current_script_dir"

    echo "${GREEN}npm install completed.${NC}"
}

function build() {
    
    if [ -z "$2" ]; then
        echo "${RED}Error: Path argument is required for the build command.${NC}"
        echo "Usage: ./frontend.sh build <path> [module]"
        exit 1
    fi

    local path="$2"
    local module="$3"
    echo "${GREEN}Starting build in path: $path${NC}"

    if [ ! -d "$path" ]; then
        echo "${RED}Error: The path $path does not exist.${NC}"
        exit 1
    fi

    cd "$path"

    if [ -z "$module" ]; then
        echo "${GREEN}Building all modules...${NC}"
        npx lerna run build --include-dependencies --stream
    else
        echo "${GREEN}Building module: $module${NC}"
        npx lerna run build --include-dependencies --stream --scope="$module"
    fi

    cd "$current_script_dir"

    echo "${GREEN}Build completed.${NC}"
}

if [ $# -eq 0 ]; then
    manual
    exit 0
fi

case "$1" in
    "clean")
        clean "$@"
        ;;
    "npmInstall")
        npmInstall "$@"
        ;;
    "build")
        build "$@"
        ;;
    "rebuild")
        rebuild "$@"
        ;;
    "refresh")
        refresh "$@"
        ;;
    "help")
        manual
        ;;
    *)
        echo "${RED}Unknown command: $1${NC}"
        manual
        ;;
esac
