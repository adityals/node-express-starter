NOW=$(shell date)

bootstrap: 
	@echo "${NOW} bootstraping..."
	@yarn

es-build:
	@echo "${NOW} bundling source files..."
	@echo "Start cleaning..."
	@rm -rf dist/
	@echo "Cleaning done..."
	@echo "Start bundling..."
	@go run cmd/main.go
	@echo "${NOW} Done!"

docker-start: bootstrap es-build
	@echo "${NOW} Starting docker..."
	@docker-compose up -d --build

docker-stop:
	@echo "${NOW} Stopping docker..."
	@docker-compose down

docker-logs-starterapp:
	@docker logs -f starterapp

docker-logs-postgres:
	@docker logs -f postgres

docker-bash-starterapp:
	@docker exec -it starterapp /bin/bash

docker-bash-potsgres:
	@docker exec -it postgres /bin/bash
