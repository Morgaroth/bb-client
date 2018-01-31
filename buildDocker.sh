#!/usr/bin/env bash

DOCKER_REGISTRY=docker-registry.getbetblocks.com:9001

VERSION=$(jq -r ".version" package.json)
docker build \
        -t $DOCKER_REGISTRY/bb-client:latest \
        -t $DOCKER_REGISTRY/bb-client:${VERSION} .
