package controller

import (
	"fmt"
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

// 获得文章，文章内容是 HTML 格式
func GetArticleHtml(ctx iris.Context) {
	title := ctx.Params().Get("title")
	article, err := domain.GetArticleHtml(title)
	if err != nil {
		ResponseErr(ctx, err)
		return
	}
	ResponseJson(ctx, article)
}

// 获得文章，文章内容是 字符串 格式。便于编辑
func GetArticleString(ctx iris.Context) {
	title := ctx.Params().Get("title")
	article, err := domain.GetArticleString(title)
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

func SaveArticle(ctx iris.Context) {
	title := ctx.FormValue("title")
	value := ctx.FormValue("value")
	fmt.Println(title,value)
	domain.SaveArticle(title,value)
	ResponseSuccess(ctx)
}

