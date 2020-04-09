package auth

import (
	"context"
	"fmt"
	"github.com/kataras/iris/v12"
	"log"
	"web-app/internal/utils"
	pbUser "web-app/proto/user"
)

type TokenJson map[string]string

/**
验证用户合法，发放token
*/
func AuthHandler(ctx iris.Context) {
	log.Printf("AuthHandler: %s \n", "starting...")

	name := ctx.URLParam("name")
	password := ctx.URLParam("password")
	if len(name) == 0 {
		name = ctx.FormValue("name")
	}
	if len(password) == 0 {
		password = ctx.FormValue("password")
	}
	fmt.Println("AuthHandler args:", name, password)

	if len(name) == 0 {
		fmt.Println("奇怪", name, len(name))
		utils.ResponseErr3(ctx, 509, "请输入用户名")
		return
	}
	if len(password) == 0 {
		utils.ResponseErr3(ctx, 509, "请输入密码")
		return
	}

	authResponse, err := getClient().Auth(context.TODO(), &pbUser.User{
		Name:     name,
		Password: password,
	})

	if err != nil {
		log.Println("验证用户失败: %s error: %v\n", name, err)
		utils.ResponseErr3(ctx, 509, "账户名或者密码错误")
	}

	log.Printf("你的 token 是: %s \n", authResponse.Token)

	utils.ResponseJson(ctx, TokenJson{"token": authResponse.Token})
}

/**
注册
*/
func SignupHandler(ctx iris.Context) {
	log.Printf("SignupHandler: %s \n", "starting...")

	name := ctx.FormValue("name")
	password := ctx.FormValue("password")
	mail := ctx.FormValue("mail")

	fmt.Println("AuthHandler args:", name, password, mail)

	if len(name) == 0 {
		log.Println("奇怪", name, len(name))
		utils.ResponseErr3(ctx, 509, "请输入用户名")
		return
	}
	if len(password) == 0 {
		utils.ResponseErr3(ctx, 509, "请输入密码")
		return
	}
	if len(mail) == 0 {
		utils.ResponseErr3(ctx, 509, "请输入mail")
		return
	}

	resp, err := getClient().Create(context.TODO(), &pbUser.User{
		Name:     name,
		Password: password,
		Email:    mail,
	})

	if err != nil {
		log.Println("创建用户失败:", name, err)
		utils.ResponseErr3(ctx, 509, "创建用户失败")
	}
	log.Println("注册成功，", resp.User)
	utils.ResponseJson(ctx, resp.User)
}

//func myAuthenticatedHandler(ctx iris.Context) {
//	user := ctx.Values().Get("jwt").(*jwt.Token)
//
//	ctx.Writef("This is an authenticated request\n")
//	ctx.Writef("Claim content:\n")
//
//	foobar := user.Claims.(jwt.MapClaims)
//	for key, value := range foobar {
//		ctx.Writef("%s = %s", key, value)
//	}
//}
//
//
//
///**
//获得 token 的验证器
//*/
//func myAuthExtractor(ctx iris.Context) (string, error) {
//	authHeader := ctx.GetHeader("Authorization")
//	if authHeader == "" {
//		return "", nil // No error, just no token
//	}
//	fmt.Println(authHeader)
//	return authHeader, nil
//}
