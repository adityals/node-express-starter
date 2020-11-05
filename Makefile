NOW=$(shell date)

docker-start:
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