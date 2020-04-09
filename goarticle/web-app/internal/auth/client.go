package auth

import (
	microclient "github.com/micro/go-micro/client"
	pbUser "web-app/proto/user"
)

func getClient() pbUser.UserServiceClient {
	client := pbUser.NewUserServiceClient("com.github.vir56k.srv.user", microclient.DefaultClient)
	return client
}
