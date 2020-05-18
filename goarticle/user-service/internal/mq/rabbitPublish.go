package mq

import (
	"github.com/streadway/amqp"
	"log"
)

const (
	queueName = "user.created"
)

type Broker interface {
	Publish(msgBody string)
}

type MessageBroker struct {
	URL string
}

func (broker MessageBroker) Publish(msgBody string) {
	// 连接 RabbitMQ
	conn, err := amqp.Dial(broker.URL)
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

	// 构建一个消息
	body := msgBody
	msg := amqp.Publishing{
		ContentType: "text/plain",
		Body:        []byte(body),
	}

	// 构建一个生产者，将消息 放入队列
	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		msg)
	failOnError(err, "发布消息失败")
	log.Printf(" [✔️] Sent %s", body)
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
