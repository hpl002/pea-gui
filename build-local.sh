#!/bin/zsh
REPO=pea-gui
IMAGE_NAME=gui
TAG=latest
REGISTRY=local/hpl002/$REPO/$IMAGE_NAME:$TAG
# hpl002/pea-gui/gui:latest

# script for local development
# easily swaps out the existing container with a new build

# get image id 
IMAGE_ID=$(docker images -f label=app=pea:gui -q)  
# get container name
CONTAINER_ID=$(docker ps -a -f ancestor=$IMAGE_ID --format='{{json .}}' | jq -r '.ID'   )
# get container ports
CONTAINER_PORTS=$(docker ps -a -f ancestor=$IMAGE_ID --format='{{json .}}' | jq -r '.Ports'   )


GET_CONTAINER_PORT_SOURCE()
{
IFS="->" read -a cleaned <<< $CONTAINER_PORTS
read -a uri <<< $cleaned
IFS=":" read -a host_port <<< $uri
read -a port <<< $host_port
echo "${port[1]}"
}

GET_CONTAINER_PORT_TARGET()
{
IFS="->" read -a cleaned <<< $CONTAINER_PORTS
read -a uri <<< $cleaned
IFS="/" read -a split <<< ${uri[1]}
read -a p <<< $split
echo ${p[0]}
}

# get source port for starting up a new container
# localhost
CONTAINER_PORT_SOURCE=$(GET_CONTAINER_PORT_SOURCE)
# get target port for starting up a new container
# container exposed port
CONTAINER_PORT_TARGET=$(GET_CONTAINER_PORT_TARGET)

# stop container
$(docker container stop $CONTAINER_ID)
# delete container
$(docker container rm $CONTAINER_ID)
# delete image
$(docker rmi $IMAGE_ID)

# build new image with the exact same tags 
docker build . --file Dockerfile --tag $IMAGE_NAME
# build new image with the exact same tags 
docker tag $IMAGE_NAME $REGISTRY

# start image on same ports as previously used 
docker run -d -p $CONTAINER_PORT_SOURCE:$CONTAINER_PORT_TARGET $REGISTRY