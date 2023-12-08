#!/bin/bash

container_name="finance-frontend"
finance_dir=/home/jacobg/Programming/finance

if [ ! -f "$finance_dir/frontend.tar.gz" ]; then
  echo "The docker image does not exist, please build and transfer it first."
  exit 1
fi

docker container stop $container_name
docker rm $container_name
