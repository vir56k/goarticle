build:
	GOOS=linux GOARCH=amd64 go build
	docker-compose build user-cli

up:
	docker-compose up -d user-cli

run:
		docker-compose up user-cli

dev:
		make build
		docker-compose up user-cli
