package domain

import (
	"article-service/internal/utils"
	pb "article-service/proto/article"
	"github.com/micro/go-micro/util/log"
	"io/ioutil"
	"path"
	"path/filepath"
	"strings"
)

type FileRepo struct {
	DataPath string
}

func (repo *FileRepo) ArticleNameList() ([]string, error) {
	files, err := ioutil.ReadDir(repo.DataPath)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	result := make([]string, 0)
	for _, f := range files {
		if f.IsDir() {
			continue
		}
		n := strings.TrimSuffix(f.Name(), path.Ext(f.Name()))
		result = append(result, n)
	}
	return result, nil
}

func (repo *FileRepo) GetArticleString(title string) (*pb.Article, error) {
	t, data, err := repo.getArticle(title)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return &pb.Article{Title: t, Body: string(data)}, nil
}

func (repo *FileRepo) SaveArticle(title string, body string) error {
	fileName := repo.makeFileName(title)
	// write文件
	err := ioutil.WriteFile(fileName, []byte(body), 0655)
	return err
}

//func ListArticles() ([]*pb.Article, error) {
//	files, err := ioutil.ReadDir(DATA_DIR)
//	if err != nil {
//		return nil, err
//	}
//	result := make([]*pb.Article, 0)
//	for _, f := range files {
//		if f.IsDir() {
//			continue
//		}
//		body, err := ioutil.ReadFile(filepath.Join(DATA_DIR, f.Name()))
//		if err != nil {
//			fmt.Println(err)
//			return nil, err
//		}
//		result = append(result, &pb.Article{Title: f.Name(), Body: string(body)})
//	}
//	return result, nil
//}

func (repo *FileRepo) GetArticleHtml(title string) (*pb.Article, error) {
	t, data, err := repo.getArticle(title)
	if err != nil {
		log.Error(err)
		return nil, err
	}
	html := utils.ParseMarkdownToHtml(data)
	return &pb.Article{Title: t, Body: html}, nil
}

func (repo *FileRepo) getArticle(title string) (string, []byte, error) {
	fileName := repo.makeFileName(title)
	// 处理扩展名
	n := strings.TrimSuffix(title, ".md")
	// 读文件
	data, err := ioutil.ReadFile(fileName)
	if err != nil {
		return title, nil, err
	}
	return n, data, nil
}

/**
通过 title 构建 fileName
*/
func (repo *FileRepo) makeFileName(title string) string {
	var fileName string
	// 判断是否 以 .md 结尾
	if i := strings.LastIndex(title, ".md"); i < 0 {
		fileName = filepath.Join(repo.DataPath, title+".md")
	} else {
		fileName = filepath.Join(repo.DataPath, title)
	}
	return fileName
}
