#!/bin/bash

forceBuild=$1

if [ -n "$forceBuild" ]; then
  ssh pi "cd /home/jacobg/Programming/finance/finance_frontend && ./deploy/pi/deploy.sh force"
else
  ssh pi "cd /home/jacobg/Programming/finance/finance_frontend && ./deploy/pi/deploy.sh"
fi