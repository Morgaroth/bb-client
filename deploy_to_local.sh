#!/usr/bin/env bash

set -e
echo $DOCKER_HOST
if [ -z ${PROJECTS_DIRECTORY+x} ]; then
    echo "PROJECTS_DIRECTORY env is unset"
    exit 1
fi
VERSION=$(jq -r ".version" package.json)
./buildDocker.sh
cd ${PROJECTS_DIRECTORY}/ansible-repositories/betblocks
git pull
./ansible-local deploy_webclient_service.yml -e version=latest
cd ${PROJECTS_DIRECTORY}/bb-client/