#!/usr/bin/env bash

CONTAINER_ID=bb-client
export DOCKER_HOST=tcp://192.168.33.6:2375

A=`docker inspect -f {{.State.Running}} ${CONTAINER_ID}`
B=`docker inspect -f {{.State.Dead}} ${CONTAINER_ID}`
echo "'$A' '$B' '$?'"
if [ "$A" = "true" ]; then
    echo "Docker $CONTAINER_ID is running, killing them..."
    docker kill ${CONTAINER_ID}
else
    echo "Docker $CONTAINER_ID not found."
fi
sleep 3
if [ "$B" != "true" ]; then
    echo "Docker $CONTAINER_ID image exists, removing them..."
    docker rm ${CONTAINER_ID}
else
    echo "Docker image $CONTAINER_ID not found."
fi
sleep 1

docker build -t dev-root-betblocks-01.gp-cloud.com:9001/${CONTAINER_ID} .
docker run -p 3000:5000 -d --name ${CONTAINER_ID} dev-root-betblocks-01.gp-cloud.com:9001/${CONTAINER_ID}:latest
