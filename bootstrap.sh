#!/usr/bin/sh

GREEN='\033[0;32m'
NC='\033[0m' # No Color


# clean out dependencies
echo "Clean up dependencies..."
rm -rf node_modules/

# clean out vendor
echo "Clean up vendor..."
rm -rf vendor/

# clean out dist directory
echo "Clean up dist directory..."
rm -rf dist/

# installing dependencies
echo "Installing dependencies..."
yarn

# installing dependencies
echo "Installing vendor for go..."
go mod vendor -v

# copy environment
echo "Copying env variables..."
cp .env.example .env

echo "Bootstrapping complete!"