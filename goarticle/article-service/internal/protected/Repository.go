package protected

import (
	"article-service/internal/domain"
	"article-service/internal/utils"
	pb "article-service/proto/article"
)

/**
文件方式的实现 保存文章
*/
type Repository interface {
	Get(title string) (*pb.Article, error)
	GetNameList() ([]string, error)
	Save(*pb.Article) error
}

type ArticleRepository struct {
	Repo domain.FileRepo
}

func (articleRepo *ArticleRepository) Get(title string) (*pb.Article, error) {
	return articleRepo.Repo.GetArticleString(title)
}

func (articleRepo *ArticleRepository) GetNameList() ([]string, error) {
	return articleRepo.Repo.ArticleNameList()
}

func (articleRepo *ArticleRepository) Save(article *pb.Article) error {
	if article == nil {
		return utils.MyError{ErrorMessage: "保存的文章不能为空"}
	}
	return articleRepo.Repo.SaveArticle(article.Title, article.Body)
}
