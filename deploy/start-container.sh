#!/bin/bash

#!/bin/bash

container_name="finance-frontend"
finance_dir=/home/jacobg/Programming/finance

ssh pi "docker container stop $container_name"
ssh pi "docker rm $container_name"
ssh pi "docker image rm $container_name"

ssh pi "cd $finance_dir && docker load < frontend.tar.gz"
ssh pi "cd $finance_dir && rm frontend.tar.gz"

ssh pi "docker run -p 3000:3000 -d --name $container_name -t $container_name"