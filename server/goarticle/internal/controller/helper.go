package controller

import (
	"github.com/kataras/iris/v12"
	"goarticle/internal/model"
)

func ResponseSuccess(ctx iris.Context) {
	ctx.JSON(model.Msg{Code: 200, Message: "", Data: nil})
}



func ResponseJson(ctx iris.Context, obj interface{}) {
	ctx.JSON(model.Msg{Code: 200, Message: "", Data: obj})
}


func ResponseErr(ctx iris.Context, err error) {
	ctx.JSON(model.Msg{Code: 500, Message: err.Error(), Data: nil})
}



func ResponseErr2(ctx iris.Context, code int, err error) {
	ctx.JSON(model.Msg{Code: code, Message: err.Error(), Data: nil})
}


func ResponseErr3(ctx iris.Context,code int, err string) {
	ctx.JSON(model.Msg{Code: code, Message: err, Data: nil})
}



