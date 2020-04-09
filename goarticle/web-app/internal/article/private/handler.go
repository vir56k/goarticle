package private

import (
	"context"
	"fmt"
	"github.com/kataras/iris/v12"
	microclient "github.com/micro/go-micro/client"
	"log"
	"web-app/internal/utils"
	pbArticle "web-app/proto/article"
)

// 获得文章，文章内容是 字符串 格式。便于编辑
func GetArticleString(ctx iris.Context) {
	log.Println("# handle GetArticleString")

	title := ctx.Params().Get("title")
	article, err := getClient().Get(context.TODO(), &pbArticle.Request{Title: title})
	if err != nil {
		utils.ResponseErr(ctx, err)
		return
	}
	utils.ResponseJson(ctx, article)
}

/**
获得文章的名字列表
*/
func GetArticleNameList(ctx iris.Context) {
	log.Println("# handle GetArticleNameList")

	resp, err := getClient().GetNameList(context.TODO(), &pbArticle.Request{})
	if err != nil {
		log.Println("# err", err)
		utils.ResponseErr(ctx, err)
		return
	}
	utils.ResponseJson(ctx, resp.Articles)
}

/**
保存
*/
func SaveArticle(ctx iris.Context) {
	log.Println("# handle SaveArticle")

	title := ctx.FormValue("title")
	value := ctx.FormValue("value")
	fmt.Println(title, value)
	_, err := getClient().Edit(context.TODO(), &pbArticle.Article{Title: title, Body: value})
	if err != nil {
		utils.ResponseErr(ctx, err)
		return
	}
	utils.ResponseSuccess(ctx)
}

func getClient() pbArticle.ArticleProtectedServiceClient {
	client := pbArticle.NewArticleProtectedServiceClient("com.github.vir56k.srv.article", microclient.DefaultClient)
	return client
}
