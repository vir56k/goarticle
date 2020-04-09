package public

import (
	"article-service/internal/domain"
	pb "article-service/proto/article"
)

/**
文件方式的实现 保存文章
*/
type Repository interface {
	Get(title string) (*pb.Article, error)
	GetNameList() ([]string, error)
}

type ArticleRepository struct {
	Repo domain.FileRepo
}

func (articleRepo *ArticleRepository) Get(title string) (*pb.Article, error) {
	return articleRepo.Repo.GetArticleHtml(title)
}

func (articleRepo *ArticleRepository) GetNameList() ([]string, error) {
	return articleRepo.Repo.ArticleNameList()
}
