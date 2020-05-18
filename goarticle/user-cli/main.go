package main

import (
	"context"
	microclient "github.com/micro/go-micro/client"
	"log"
	pbUser "user-cli/proto/user"
)

func main() {
	log.Println("# [email-service 微服务] ready...")

	testCreateUser()
}

func testCreateUser() {
	resp, err := getClient().Create(context.TODO(), &pbUser.User{
		Name:     "zhang3",
		Password: "admin",
		Email:    "vir56k@163.com",
	})
	if err != nil {
		log.Fatal(err)
	}
	log.Println("testCreateUser resp=", resp)
}

func getClient() pbUser.UserServiceClient {
	client := pbUser.NewUserServiceClient("com.github.vir56k.srv.user", microclient.DefaultClient)
	return client
}
