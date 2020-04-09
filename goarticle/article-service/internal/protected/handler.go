package protected

import (
	pb "article-service/proto/article"
	"context"
	"log"
)

type Handler struct {
	Repo Repository
}

func (h *Handler) Get(ctx context.Context, req *pb.Request, resp *pb.Response) error {
	log.Println("# [handler Get] starting...")
	article, err := h.Repo.Get(req.Title)
	if err != nil {
		log.Println(err)
		return err
	}
	resp.Article = article
	return nil
}

func (h *Handler) GetNameList(ctx context.Context, req *pb.Request, resp *pb.Response) error {
	log.Println("# [handler GetNameList] starting...")
	list, err := h.Repo.GetNameList()
	if err != nil {
		log.Println(err)
		return err
	}
	// 为了扩展性，这里也返回 article对象，而不是字符串数组
	result := make([]*pb.Article, 0)
	for _, t := range list {
		result = append(result, &pb.Article{Title: t})
	}
	log.Println("# [handler GetNameList] result", result)
	resp.Articles = result
	return nil
}

func (h *Handler) Edit(ctx context.Context, req *pb.Article, resp *pb.Response) error {
	log.Println("# [handlel Edit] starting...")
	a := &pb.Article{Title: req.Title, Body: req.Body}
	err := h.Repo.Save(a)
	if err != nil {
		log.Println(err)
		return err
	}
	//重新从数据库中读取
	article, err := h.Repo.Get(req.Title)
	if err != nil {
		return err
	}
	resp.Article = article
	return nil
}
