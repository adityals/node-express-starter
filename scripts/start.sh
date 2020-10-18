#!/bin/bash

echo "Installing deps..."
yarn

echo "Build and running..."
yarn prod:serve