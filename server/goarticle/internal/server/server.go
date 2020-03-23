package server

import (
	"fmt"
	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
	"goarticle/internal/config"
	"goarticle/internal/controller"
	"goarticle/internal/utils"
)

func Run() {
	fmt.Println("ready...")

	app := iris.New()
	app.Use(logger.New())
	app.Use(recover.New())

	iniLog(app)// 初始化 日志

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allows everything, use that to change the hosts.
		AllowCredentials: true,
	})

	// api
	api := app.Party("/api", crs).AllowMethods(iris.MethodOptions)
	{
		api.Handle("GET", "/articles", controller.ListArticles)
		api.Handle("GET", "/article/namelist", controller.GetArticleNameList)
		api.Handle("GET", "/article/{title:string}", controller.GetArticleHtml)

		manage := api.Party("/manage")
		manage.Handle("GET", "/article/origin/{title:string}", controller.GetArticleString)
		manage.Handle("POST", "/article/save", controller.SaveArticle)


	}
	// 其他
	app.Handle("GET", "/", func(ctx iris.Context) {
		ctx.HTML("<h1>Welcome</h1>")
	})

	fmt.Println("running...")

	app.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))

}

func iniLog(app *iris.Application) {
	// 处理是否写入到文件
	cfg := config.Get()
	if cfg.LogToFile {
		logFile := utils.OpenLogFile()
		defer logFile.Close()
		app.Logger().SetOutput(logFile)
	}
}
