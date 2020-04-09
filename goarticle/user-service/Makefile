build:
	# 生成 pb 代码
	protoc -I. --go_out=plugins=micro:. proto/user/user.proto
	# 拷贝 pb 生成的代码到 web-app 微服务
	cp proto/user/*.pb.go ../web-app/proto/user/article
	GOOS=linux GOARCH=amd64 go build
	# docker build -t user-service .
	docker-compose build user-service

up:
	docker-compose up -d user-service

run:
	# docker run -p 50053:50051 -e MICRO_SERVER_ADDRESS=:50051 -e MICRO_REGISTRY=mdns user-service
	docker-compose up -d user-service

dev:
	make build
	docker-compose up user-service
