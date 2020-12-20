#!/bin/zsh
REPO=hpl002/pea-gui/
# script for local development
# easily swaps out the existing container with a new build


# Get image id 
IMAGE_ID=$(docker images -f label=app=pea:gui -q)  
# Get container name
CONTAINER_ID=$(docker ps -a -f ancestor=$IMAGE_ID --format='{{json .}}' | jq -r '.ID'   )
# Get container ports
CONTAINER_PORTS=$(docker ps -a -f ancestor=$IMAGE_ID --format='{{json .}}' | jq -r '.Ports'   )

# source port

# target port

 
# Stop container
$(docker container stop $CONTAINER_ID)
# Delete container
$(docker container rm $CONTAINER_ID)
# Delete image
$(docker rmi $IMAGE_ID)

# build new image with the exact same tags 
docker build . --file Dockerfile --tag local/$REPO
# start image on same port

# docker run -p $TARGET_PORT:#CONTAINER_PORT


# get info pertaining to 
echo $CONTAINER_NAME

