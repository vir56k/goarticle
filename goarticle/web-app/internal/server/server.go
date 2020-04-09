package server

import (
	"fmt"
	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
	"web-app/internal/article/private"
	"web-app/internal/article/public"
	"web-app/internal/auth"
	"web-app/internal/config"
	"web-app/internal/utils"
)

const (
	port = "8080"
)

func Run() {
	fmt.Println("ready...")

	app := iris.New()
	app.Use(logger.New())
	app.Use(recover.New())
	// 授权相关的中间件
	authMiddleware := auth.GetAuthMiddleware()

	iniLog(app) // 初始化 日志

	crs := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allows everything, use that to change the hosts.
		AllowCredentials: true,
		AllowedHeaders:   []string{"Authorization"},
	})

	// api
	api := app.Party("/api", crs).AllowMethods(iris.MethodOptions)
	{
		// 授权相关
		api.Handle("POST", "/login", auth.AuthHandler)

		// 可公开访问的
		api.Handle("GET", "/articles", public.ListArticles)
		api.Handle("GET", "/articles/namelist", public.GetArticleNameList)
		api.Handle("GET", "/article/{title:string}", public.GetArticleHtml)

		// manager 下的，需要 身份验证
		protected := api.Party("/protected",authMiddleware)
		protected.Handle("GET", "/articles/namelist", private.GetArticleNameList)
		protected.Handle("GET", "/article/origin/{title:string}", private.GetArticleString)
		protected.Handle("POST", "/article/save", private.SaveArticle)

	}
	// 其他
	app.Handle("GET", "/", func(ctx iris.Context) {
		ctx.HTML("<h1>Welcome</h1>")
	})

	fmt.Println("running...")

	app.Run(iris.Addr(":"+port), iris.WithoutServerError(iris.ErrServerClosed))

}

func iniLog(app *iris.Application) {
	// 处理是否写入到文件
	cfg := config.GetBuildConfig()
	if cfg.LogToFile {
		logFile := utils.OpenLogFile()
		defer logFile.Close()
		app.Logger().SetOutput(logFile)
	}
}
