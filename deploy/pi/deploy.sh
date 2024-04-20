#!/bin/bash

start_app() {
  container_id=$(docker ps -q -f name=$container_name)

  if [ -n "$container_id" ]; then
    echo "$log_prefix app is already running, restarting now."
    docker container stop $container_name > /dev/null
  fi

  docker rm $container_name > /dev/null

  container_id=`docker run -p 3000:3000 -d --name $container_name -t $container_name`
  
  echo "$log_prefix started with container id $container_id"
}

log_prefix="Finance Frontend:"
container_name=finance-frontend

# Fetch the latest commits and refs from the remote
git fetch > /dev/null

# Store the current HEAD commit hash
OLD_HEAD=$(git rev-parse HEAD)

# Merge the fetched commits
git merge > /dev/null

# Store the new HEAD commit hash
NEW_HEAD=$(git rev-parse HEAD)

# Compare OLD_HEAD and NEW_HEAD
if [ "$OLD_HEAD" = "$NEW_HEAD" ]; then
  echo "$log_prefix up to date, skipping Docker build..."

  start_app

  exit 0
fi

echo "$log_prefix there are unbuilt changes, starting build now."

docker build -t $container_name ../.

start_app

