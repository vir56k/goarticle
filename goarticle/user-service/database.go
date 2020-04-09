package main

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"os"
)

// 创建一个 数据库连接
func CreateConnection() (*gorm.DB, error) {

	// 获得环境变量的
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	DBName := os.Getenv("DB_NAME")
	password := os.Getenv("DB_PASSWORD")
	port := os.Getenv("DB_PORT")

	//host := "127.0.0.1"
	//user := "postgres"
	//DBName := "postgres"
	//password := "postgres"

	s := fmt.Sprintf(
		"host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
		host, port, user, DBName, password,
	)
	log.Println("数据库连接", s)
	return gorm.Open("postgres", s)
}
