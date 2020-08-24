#!/usr/bin/sh

GREEN='\033[0;32m'
NC='\033[0m' # No Color


# clean out dependencies
echo "Clean up dependencies..."
rm -rf node_modules/

# clean out dist directory
echo "Clean up dist directory..."
rm -rf dist/

# installing dependencies
echo "Installing dependencies..."
yarn

# copy environment
echo "Copying env variables..."
cp .env.example .env

echo "Try ${GREEN}yarn dev:serve${NC} and Happy Development 🔥"