build:
	GOOS=linux GOARCH=amd64 go build
	#go build
	docker-compose build web-app

up:
	docker-compose up -d web-app

run:
	docker-compose up web-app

dev:
	make build
	docker-compose up web-app
