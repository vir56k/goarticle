package public

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
	log.Println("# [handler Get] result", article)
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

func (h *Handler) GetAll(ctx context.Context, req *pb.Request, resp *pb.Response) error {
	//log.Println("# [handler Get] starting...")
	//article, err := h.Repo.Get(req.Title)
	//if err != nil {
	//	return err
	//}
	//resp.Article = article
	return nil
}
