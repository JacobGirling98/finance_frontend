#!/bin/bash

image_name="finance-frontend"

docker build -t $image_name ../.
docker save $image_name | gzip -c > frontend.tar.gz

scp frontend.tar.gz pi:~/Programming/finance/frontend.tar.gz

rm frontend.tar.gz
docker image rm $image_name

./start-container.sh