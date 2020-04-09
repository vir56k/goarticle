package main

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/micro/go-micro"
	"log"
	pb "user-service/proto/user"
)

func main() {

	// 创建数据库连接
	db, err := CreateConnection()
	defer db.Close()

	// 日志模式
	db.LogMode(true)

	if err != nil {
		log.Fatalf("连接数据库失败: %v", err)
	} else {
		log.Println("数据库连接成功")
	}
	// 同步数据模型
	err = HandleMigrate(db, &pb.User{})
	if err != nil {
		log.Fatal("自动创建表失败")
	}
	checkTable(db)

	// 创建数据访问对象，它包含了数据库连接
	repo := &UserRepository{db}
	// token 的编码和解码对象
	tokenService := TokenService{}
	// 装载进 handler
	h := &handler{repo, &tokenService}

	// 创建微服务
	srv := micro.NewService(
		// 文件名要和 pb 文件里的匹配
		micro.Name("com.github.vir56k.srv.user"),
		micro.Version("latest"),
	)

	log.Println("启动服务...")
	srv.Init()
	pb.RegisterUserServiceHandler(srv.Server(), h)
	if err := srv.Run(); err != nil {
		fmt.Println(err)
	}
}

func checkTable(db *gorm.DB) {
	if !db.HasTable("users") {
		log.Println("users 不存在")
	} else {
		log.Println("users 表存在")
	}
	//newPWD, _ := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
	//db.Delete(&pb.User{})
	//db.Create(&pb.User{Name: "admin", Password:  string(newPWD)})
}

func HandleMigrate(db *gorm.DB, models ...interface{}) error {
	// this need to be checked
	err := db.AutoMigrate(models...).Error
	if err != nil {
		fmt.Println("Error HandleMigrate:" + err.Error())
		return err
	}
	return nil
}
