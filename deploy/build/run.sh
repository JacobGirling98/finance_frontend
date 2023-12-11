#!/bin/bash

script_path=$(realpath "$0")
script_dir=$(dirname "$script_path")

finance_dir=/home/jacobg/Programming/finance/finance_frontend
script=run-app-pi.sh

scp "$script_dir/$script" pi:$finance_dir/.

ssh pi "cd $finance_dir && ./$script"

ssh pi "cd $finance_dir && rm $script"