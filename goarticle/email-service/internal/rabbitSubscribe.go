package internal

import (
	"github.com/streadway/amqp"
	"log"
)

const (
	queueName = "user.created"
)

func Subscribe(url string) {
	// 连接 RabbitMQ
	conn, err := amqp.Dial(url)
	failOnError(err, "连接失败")
	defer conn.Close()
	log.Println("连接成功")

	// 建立一个 channel ( 其实就是TCP连接 ）
	ch, err := conn.Channel()
	failOnError(err, "打开通道失败")
	defer ch.Close()
	log.Println("打开通道成功")

	// 创建一个名字叫 "hello" 的队列
	q, err := ch.QueueDeclare(
		queueName, // name
		false,     // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // arguments
	)
	failOnError(err, "创建队列失败")

	// 开启一个 消费者
	// 返回值是 ch 类型
	msgChan, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "注册消费者 ，失败")
	log.Println("注册消费者成功,开始监听队列=", q.Name)

	//帮助阻塞
	forever := make(chan bool)

	// 开启一个 go程
	go func() {
		for d := range msgChan {
			msg := string(d.Body)
			log.Printf("收到消息: %s", msg)
			log.Print("准备发送邮件到：", msg)
		}

	}()

	log.Printf(" 等待消息...")
	<-forever
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
