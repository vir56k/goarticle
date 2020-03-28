package metaweblog

import (
	"fmt"
	"goarticle/internal/config"
)

func Test() {
	fmt.Println("on metaweblog Test Start ***********")

	c, err := config.GetBlogConfig()
	if err != nil {
		fmt.Println(err)
		return
	}
	account := Account{UserName:c.Cnblog.UserName,Password:c.Cnblog.Password}
	userInfo := GetUsersBlogs(account)
	fmt.Println(userInfo)

	fmt.Println("on metaweblog Test End ***********")
}
