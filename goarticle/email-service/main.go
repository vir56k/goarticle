package main

import (
	"email-service/internal"
	"fmt"
	"log"
	"os"
)

func main() {
	log.Println("# [email-service 微服务] ready...")
	url := buildURL()
	//Publish("hello", url)
	internal.Subscribe(url)
}

func buildURL() string {
	user := os.Getenv("MQ_USER")
	password := os.Getenv("MQ_PASSWORD")
	host := os.Getenv("MQ_HOST")
	port := os.Getenv("MQ_PORT")
	vHost := os.Getenv("MQ_VHOST")
	//url := "amqp://admin:admin@rabbitmq:5672/"
	s := fmt.Sprintf(
		"amqp://%s:%s@%s:%s%s",
		user, password, host, port, vHost,
	)
	log.Println("MQ连接URL=", s)
	return s
}
