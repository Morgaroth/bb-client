#!/usr/bin/env bash

export DOCKER_HOST=tcp://192.168.33.6:2375
set -e
if [ -z ${PROJECTS_DIRECTORY+x} ]; then
    echo "PROJECTS_DIRECTORY env is unset"
    exit 1
fi
VERSION=$(jq -r ".version" package.json)
./buildDocker.sh
cd ${PROJECTS_DIRECTORY}/betblocks_deployment
git pull
./ansible-vagrant deploy_webclient_service.yml -e version=latest
cd ${PROJECTS_DIRECTORY}/bb-client/