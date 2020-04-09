package public

import (
	"context"
	"github.com/kataras/iris/v12"
	microclient "github.com/micro/go-micro/client"
	"log"
	"web-app/internal/utils"
	pbArticle "web-app/proto/article"
)

/**
获得文章的名字列表
*/
func GetArticleNameList(ctx iris.Context) {
	log.Println("# handle GetArticleNameList")
	resp, err := getClient().GetNameList(context.TODO(), &pbArticle.Request{})
	if err != nil {
		utils.ResponseErr(ctx, err)
		return
	}
	utils.ResponseJson(ctx, resp.Articles)
}

/**
获得文章列表
*/
func ListArticles(ctx iris.Context) {
	//utils.LogInfo(ctx, "Request path: %s", ctx.Path())
	//articles, err := domain.ListArticles()
	//if err != nil {
	//	utils.ResponseErr(ctx, err)
	//	return
	//}
	//utils.ResponseJson(ctx, articles)
}

// 获得文章，文章内容是 HTML 格式
func GetArticleHtml(ctx iris.Context) {
	log.Println("# handle GetArticleHtml")
	title := ctx.Params().Get("title")
	article, err := getClient().Get(context.TODO(), &pbArticle.Request{Title: title})
	if err != nil {
		utils.ResponseErr(ctx, err)
		return
	}
	utils.ResponseJson(ctx, article)
}

func getClient() pbArticle.ArticlePublicServiceClient {
	client := pbArticle.NewArticlePublicServiceClient("com.github.vir56k.srv.article", microclient.DefaultClient)
	return client
}
