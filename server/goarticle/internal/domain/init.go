package domain

import (
	"fmt"
	"goarticle/internal/config"
)

func init() {
	initConnectionString()
	initDB()
}

var connectionString string

func initConnectionString() {
	fmt.Println("# initConnectionString", "init")

	user := config.GetMySqlConfig().User
	pwd := config.GetMySqlConfig().Password
	host := config.GetMySqlConfig().Host
	dbName := config.GetMySqlConfig().DatabaseName
	connectionString = fmt.Sprintf("%v:%v@(%v)/%v?charset=utf8&parseTime=True&loc=Local", user, pwd, host, dbName)
	fmt.Println("数据库连接=", connectionString)
}

func initDB() {
	fmt.Println("# initDB", "init")
	db, err := OpenDB()
	defer db.Close()

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	// 自动迁移模式
	db.AutoMigrate(&AccountInfo{})
	db.FirstOrCreate(&AccountInfo{Name: "zhangyunfei", Password: "123", Status: 0}, AccountInfo{Name: "zhangyunfei"})
}
