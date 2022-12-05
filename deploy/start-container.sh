#!/bin/bash

ssh pi "docker run -p 3000:3000 -d --name finance-frontend finance-frontend"