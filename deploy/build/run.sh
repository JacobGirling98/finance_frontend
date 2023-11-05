#!/bin/bash

script_path=$(realpath "$0")
script_dir=$(dirname "$script_path")

"$script_dir"/start-docker.sh

container_name=finance-frontend

docker build -t $container_name "$script_dir"/../../.
docker save $container_name | gzip -c > "$script_dir"/frontend.tar.gz

scp "$script_dir"/frontend.tar.gz pi:~/Programming/finance/frontend.tar.gz

rm "$script_dir"/frontend.tar.gz
docker image rm $container_name