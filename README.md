## Node Express Typescript Esbuild Starter

### Overview
A starter for node express typescript with simple esbuild config.
Using [esbuild](https://esbuild.github.io/) for bundler (only for docker).

### Getting Started

-   Make sure you have yarn, `Node.js` with version `>= 10`, and `go` with version `>= 1.3`.
-   Run `./bootstrap.sh`

### Basic Command
These commands is using `webpack` for bundling.

-   `yarn dev:serve` serve node express in **development** mode
-   `yarn prod:serve` serve node express in **production** mode
-   `yarn build:dev` build code with webpack in **development** mode
-   `yarn build:prod` build code with wepback in **production** mode
-   `yarn clean` clean up dist directory

### Run with docker
These commands is using `esbuild` for bundling.

- `make docker-start` to start docker with starterapp container
- `make docker-stop` to stop and removing starterapp container