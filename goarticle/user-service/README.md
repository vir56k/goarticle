

# docker-compose 方式 启动服务的顺序
**先启动数据库**
docker-compose up -d database

等待启动完毕，因为 数据库启动需要一段时间
**在启动服务**
docker-compose up -d user-service


# docker 直接启动 
在此之前，需要手动拉取 Postgres 镜像并运行：

**拉取 Postgres 镜像**
$ docker pull postgres
**启动 postgres**
$ docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres




