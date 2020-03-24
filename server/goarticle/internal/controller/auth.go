package controller

import (
	"fmt"
	"github.com/kataras/iris/v12"
	"github.com/iris-contrib/middleware/jwt"
)

type TokenJson map[string]string

func GetTokenHandler(ctx iris.Context) {
	name := ctx.URLParam("name")
	password := ctx.URLParam("password")
	if len(name) == 0{
		name = ctx.FormValue("name")
	}
	if len(password) == 0 {
		password = ctx.FormValue("password")
	}
	fmt.Println(name,password)
	if len(name) == 0 {
		fmt.Println("奇怪",name,len(name))
		ResponseErr3(ctx,509,"请输入用户名")
		return
	}
	if len(password) == 0 {
		ResponseErr3(ctx,509,"请输入密码")
		return
	}

	token := jwt.NewTokenWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		""+name: ""+password,
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, _ := token.SignedString([]byte("HelloW1234"))

	ResponseJson(ctx, TokenJson{"token": tokenString})
}

func myAuthenticatedHandler(ctx iris.Context) {
	user := ctx.Values().Get("jwt").(*jwt.Token)

	ctx.Writef("This is an authenticated request\n")
	ctx.Writef("Claim content:\n")

	foobar := user.Claims.(jwt.MapClaims)
	for key, value := range foobar {
		ctx.Writef("%s = %s", key, value)
	}
}

func GetAuthMiddleware() *jwt.Middleware {
	j := jwt.New(jwt.Config{
		// Extract by "token" url parameter.
		//Extractor: jwt.FromParameter("Authorization"),
		Extractor: myAuthExtractor,

		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte("HelloW1234"), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})
	return j
}

/**
获得 token 的验证器
 */
func myAuthExtractor(ctx iris.Context) (string, error) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		return "", nil // No error, just no token
	}
	fmt.Println(authHeader)
	return authHeader, nil
}
