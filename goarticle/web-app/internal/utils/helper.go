package utils

import (
	"github.com/kataras/iris/v12"
)

func ResponseSuccess(ctx iris.Context) {
	ctx.JSON(Msg{Code: 200, Message: "", Data: nil})
}



func ResponseJson(ctx iris.Context, obj interface{}) {
	ctx.JSON(Msg{Code: 200, Message: "", Data: obj})
}


func ResponseErr(ctx iris.Context, err error) {
	ctx.JSON(Msg{Code: 500, Message: err.Error(), Data: nil})
}



func ResponseErr2(ctx iris.Context, code int, err error) {
	ctx.JSON(Msg{Code: code, Message: err.Error(), Data: nil})
}


func ResponseErr3(ctx iris.Context,code int, err string) {
	ctx.JSON(Msg{Code: code, Message: err, Data: nil})
}



