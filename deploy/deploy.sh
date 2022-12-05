#!/bin/bash

docker build -t finance-frontend ../.
docker save finance-frontend | gzip -c > frontend.tar.gz

scp frontend.tar.gz pi:~/Programming/finance/frontend.tar.gz

rm frontend.tar.gz

finance_dir=/home/jacobg/Programming/finance

ssh pi "cd $finance_dir && docker load < frontend.tar.gz"
ssh pi "cd $finance_dir rm frontend.tar.gz"
./start-container.sh