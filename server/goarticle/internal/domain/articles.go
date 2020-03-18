package domain

import (
	"fmt"
	"goarticle/internal/model"
	"goarticle/internal/utils"
	"io/ioutil"
	"path"
	"path/filepath"
	"strings"
)

const DATA_DIR = "data"

func ListArticles() ([]*model.Article, error) {
	files, err := ioutil.ReadDir(DATA_DIR)
	if err != nil {
		return nil, err
	}
	result := make([]*model.Article, 0)
	for _, f := range files {
		if f.IsDir() {
			continue
		}
		body, err := ioutil.ReadFile(filepath.Join(DATA_DIR, f.Name()))
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		result = append(result, &model.Article{Title: f.Name(), Body: string(body)})
	}
	return result, nil
}

func ArticleNameList() ([]*model.Article, error) {
	files, err := ioutil.ReadDir(DATA_DIR)
	if err != nil {
		return nil, err
	}
	result := make([]*model.Article, 0)
	for _, f := range files {
		if f.IsDir() {
			continue
		}
		//body, err := ioutil.ReadFile(filepath.Join(DATA_DIR, f.Name()))
		//if err != nil {
		//	fmt.Println(err)
		//	return nil, err
		//}
		n := strings.TrimSuffix(f.Name(), path.Ext(f.Name()))
		result = append(result, &model.Article{Title: n, Body: ""})
	}
	return result, nil
}

func GetArticle(title string) (*model.Article, error) {
	var fileName string
	// 判断是否 以 .md 结尾
	if i := strings.LastIndex(title, ".md"); i < 0 {
		fileName = filepath.Join(DATA_DIR, title+".md")
	} else {
		fileName = filepath.Join(DATA_DIR, title)
	}
	data, err := ioutil.ReadFile(fileName)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	html := utils.ParseMarkdownToHtml(data)
	return &model.Article{Title: title, Body: html}, nil
}
