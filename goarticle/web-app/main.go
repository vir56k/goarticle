package main

import (
	"fmt"
	"github.com/micro/go-micro/config/cmd"
	"web-app/internal/server"
)

func main() {
	fmt.Println("# on main")

	cmd.Init()

	server.Run()
}
