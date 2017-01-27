#!/usr/bin/env bash

#export DOCKER_HOST=tcp://192.168.33.6:2375
set -e
if [ -z ${PROJECTS_DIRECTORY+x} ]; then
    echo "PROJECTS_DIRECTORY env is unset"
    exit 1
fi
VERSION=$(jq -r ".version" package.json)
NAME_1=dev-root-betblocks-01.gp-cloud.com:9001/bb-client:latest
NAME_2=dev-root-betblocks-01.gp-cloud.com:9001/bb-client:v${VERSION}
docker build -t ${NAME_1} -t ${NAME_2} .
docker push ${NAME_1}
docker push ${NAME_2}
cd ${PROJECTS_DIRECTORY}/ansible-repositories/betblocks
git pull
./ansible-dev deploy_webclient_service.yml -e version=v${VERSION}
cd ${PROJECTS_DIRECTORY}/bb-client/