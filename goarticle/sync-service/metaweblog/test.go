package metaweblog

import (
	"fmt"
	"goarticle/internal/config"
)

func Test() {
	fmt.Println("on metaweblog Test Start ***********")

	c := config.GetBlogConfig()
	account := Account{UserName: c.UserName, Password: c.Password}
	userInfo := GetUsersBlogs(account)
	fmt.Println(userInfo)

	fmt.Println("on metaweblog Test End ***********")
}
