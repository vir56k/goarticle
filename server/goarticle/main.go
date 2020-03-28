package main

import (
	"fmt"
	_ "goarticle/internal/domain"
	"goarticle/internal/server"
)

func main(){
	fmt.Println("on main")
	server.Run()
}
