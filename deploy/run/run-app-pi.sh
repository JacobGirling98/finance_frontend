#!/bin/bash
container_name="finance-frontend"

container_id=$(docker ps -q -f name=$container_name)

if [ -n "$container_id" ]; then
  docker container stop $container_name
fi

docker rm $container_name

docker run -p 3000:3000 -d --name $container_name -t $container_name