#!/bin/bash

FE_PATH="./FE/fe/"
BE_PATH="./BE/"

# start BE 
echo "Starting Back-End..."
( cd $BE_PATH && echo "Installing dependencies" && yarn && echo "Running starter" && npm run dev-start )&



echo "Starting Front-End..."
cd $FE_PATH
echo "Installing Dependencies"
yarn
echo "Running starter"
yarn start


echo "Project is ready"
