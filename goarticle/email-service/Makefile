build:
	GOOS=linux GOARCH=amd64 go build
	docker-compose build email-service

up:
	docker-compose up -d email-service

run:
		docker-compose up email-service

dev:
		make build
		docker-compose up email-service
