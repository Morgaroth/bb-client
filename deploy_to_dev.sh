#!/usr/bin/env bash

DOCKER_REGISTRY=docker-registry.getbetblocks.com:9001
set -e
if [ -z ${PROJECTS_DIRECTORY+x} ]; then
    echo "PROJECTS_DIRECTORY env is unset"
    exit 1
fi
VERSION=$(jq -r ".version" package.json)
NAME_1=${DOCKER_REGISTRY}/bb-client:latest
NAME_2=${DOCKER_REGISTRY}/bb-client:${VERSION}
docker build -t ${NAME_1} -t ${NAME_2} .
docker push ${NAME_1}
docker push ${NAME_2}
cd ${PROJECTS_DIRECTORY}/betblocks_deployment
git pull
./ansible-dev deploy_webclient_service.yml -e version=${VERSION}
cd ${PROJECTS_DIRECTORY}/bb-client/