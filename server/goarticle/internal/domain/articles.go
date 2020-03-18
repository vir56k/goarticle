package domain

import (
	"fmt"
	"goarticle/internal/model"
	"io/ioutil"
	"path/filepath"
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

func GetArticle(title string) (*model.Article, error) {
	fileName := filepath.Join(DATA_DIR, title)
	data, err := ioutil.ReadFile(fileName)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return &model.Article{Title: title, Body: string(data)}, nil
}
