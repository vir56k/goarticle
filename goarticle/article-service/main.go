package main

import (
	"article-service/internal/domain"
	"article-service/internal/protected"
	"article-service/internal/public"
	"article-service/internal/utils"
	pb "article-service/proto/article"
	"fmt"
	"github.com/micro/go-micro"
	"log"
)

const (
	DataPath = "data"
)

func main() {
	log.Println("# [微服务] ready...")

	initDataPath(DataPath)
	// 受保护的 文章微服务
	protectedHandler := initProtectedService(DataPath)

	// 可公开访问的 文章微服务
	publicHandler := initPublicService(DataPath)

	// 创建微服务
	srv := micro.NewService(
		// 文件名要和 pb 文件里的匹配
		micro.Name("com.github.vir56k.srv.article"),
		micro.Version("latest"),
	)
	log.Println("# [article 微服务] 启动中...")
	srv.Init()
	pb.RegisterArticleProtectedServiceHandler(srv.Server(), protectedHandler)
	pb.RegisterArticlePublicServiceHandler(srv.Server(), publicHandler)
	if err := srv.Run(); err != nil {
		fmt.Println(err)
	}
}

func initDataPath(path string) {
	if !utils.IsDirectoryExist(path) {
		log.Println("data 文件夹不存在, 准备创建", path)
		//utils.MakeDir(path)
	} else {
		log.Println("data 文件夹存在", path)
	}
}

func initProtectedService(dataPath string) *protected.Handler {
	// 文档存储路径
	r := domain.FileRepo{DataPath: dataPath}

	// 创建数据访问对象
	repo := &protected.ArticleRepository{Repo: r}
	// 装载进 handler
	h := &protected.Handler{Repo: repo}
	return h
}

func initPublicService(dataPath string) *public.Handler {
	// 文档存储路径
	r := domain.FileRepo{DataPath: dataPath}

	// 创建数据访问对象
	repo := &public.ArticleRepository{Repo: r}
	// 装载进 handler
	h := &public.Handler{Repo: repo}
	return h
}
