#!/bin/bash

script_path=$(realpath "$0")
script_dir=$(dirname "$script_path")

container_name=finance-frontend

docker build -t $container_name "$script_dir"/../../.