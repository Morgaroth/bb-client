#!/usr/bin/env bash

VERSION=$(jq -r ".version" package.json)
export DOCKER_HOST=tcp://192.168.33.6:2375
docker build \
        -t dev-root-betblocks-01.gp-cloud.com:9001/bb-client:latest \
        -t dev-root-betblocks-01.gp-cloud.com:9001/bb-client:v${VERSION} .
