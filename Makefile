NOW=$(shell date)

docker-start:
	@echo "${NOW} Starting docker..."
	@docker-compose up -d --build

docker-stop:
	@echo "${NOW} Stopping docker..."
	@docker-compose down

docker-logs:
	@docker logs -f starterapp

docker-bash:
	@docker exec -it starterapp /bin/bash