package controller

import (
	"github.com/kataras/iris/v12"
	"goarticle/internal/domain"
)

func ListArticles(ctx iris.Context) {
	articles, err := domain.ListArticles()
	if err != nil {
		ResponseErr(ctx, err)
		return
	}
	ResponseJson(ctx, articles)
}

func GetArticle(ctx iris.Context) {
	title := ctx.Params().Get("title")
	article, err := domain.GetArticle(title)
	if err != nil {
		ResponseErr(ctx, err)
		return
	}
	ResponseJson(ctx, article)
}

func GetArticleNameList(ctx iris.Context) {
	articles, err := domain.ArticleNameList()
	if err != nil {
		ResponseErr(ctx, err)
		return
	}
	ResponseJson(ctx, articles)
}