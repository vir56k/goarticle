package auth

import (
	osContext "context"
	"github.com/kataras/iris/v12/context"
	"log"
	"web-app/internal/utils"
	pbUser "web-app/proto/user"
)

func GetAuthMiddleware() context.Handler {
	f := func(ctx context.Context) {
		println("进入 auth 中间件")
		token := ctx.GetHeader("Authorization")
		println("token=", token)
		t, err := getClient().ValidateToken(osContext.TODO(), &pbUser.Token{Token: token})
		if err != nil {
			log.Println("验证token异常:", err)
		}
		log.Println("验证token后:", t.Valid)
		if !t.Valid {
			utils.ResponseErr(ctx, utils.MyError{ErrorMessage: "token过期"})
			return
		}
		ctx.Next() //继续执行下一个handler，这本例中是mainHandler
	}
	return f
}
