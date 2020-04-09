build:
	cd article-service && make && cd ..
	cd user-service && make && cd ..
	cd web-app && make && cd ..
	#docker-compose build

run:
	docker-compose up -d database
	sleep 10 &
	docker-compose up -d user-service
	docker-compose up -d article-service
	docker-compose up -d web-app
