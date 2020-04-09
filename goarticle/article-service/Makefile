build:
	# 生成 pb 代码
	protoc -I. --go_out=plugins=micro:. proto/article/article.proto
	# 拷贝 pb 生成的代码到 web-app 微服务
	cp proto/article/*.pb.go ../web-app/proto/article
	GOOS=linux GOARCH=amd64 go build
	docker-compose build article-service

up:
	docker-compose up -d article-service

run:
		docker-compose up article-service

single:
		# docker run -p 50053:50051 -e MICRO_SERVER_ADDRESS=:50051 -e MICRO_REGISTRY=mdns user-service

dev:
		make build
		docker-compose up article-service
