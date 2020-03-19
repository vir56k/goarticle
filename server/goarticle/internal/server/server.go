package server

import (
	"fmt"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
	"goarticle/internal/controller"
	"github.com/iris-contrib/middleware/cors"
)

func Run() {
	fmt.Println("ready...")

	app := iris.New()
	app.Use(logger.New())
	app.Use(recover.New())

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allows everything, use that to change the hosts.
		AllowCredentials: true,
	})


	// api
	api := app.Party("/api",crs).AllowMethods(iris.MethodOptions)
	{
		api.Handle("GET", "/articles", controller.ListArticles)
		api.Handle("GET", "/article/namelist", controller.GetArticleNameList)
		api.Handle("GET", "/article/{title:string}", controller.GetArticleHtml)
		api.Handle("GET", "/article/origin/{title:string}", controller.GetArticleString)
		api.Handle("POST", "/article/save", controller.SaveArticle)
	}
	// 其他
	app.Handle("GET", "/", func(ctx iris.Context) {
		ctx.HTML("<h1>Welcome</h1>")
	})

	fmt.Println("running...")

	app.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))

}
