#!/bin/bash
container_name="finance-frontend"

docker run -p 3000:3000 -d --name $container_name -t $container_name