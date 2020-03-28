package domain

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type AccountInfo struct {
	gorm.Model
	Name     string `gorm:"not null;unique"`
	Password string `gorm:"not null;"`
	Status   uint   `gorm:"default:0"`
}

func GetUserByNameAndPwd(name, password string) AccountInfo {
	db, err := OpenDB()
	defer db.Close()
	if err != nil {
		fmt.Println(err)
	}
	var user AccountInfo
	// 获取第一个匹配记录
	db.Where("name = ? and password = ?", name, password).First(&user)
	return user

}

func runAccount() {
	db, err := OpenDB()
	defer db.Close()

	if err != nil {
		fmt.Println(err)
	}

	db.Create(&AccountInfo{Name: "zhang3", Password: "123", Status: 0})
	db.Create(&AccountInfo{Name: "zhang4", Password: "123", Status: 0})

	var a AccountInfo
	db.First(&a, 1) // 查询id为1的product
	fmt.Println("#1 found", a)
	db.First(&a, "Name=?", "zhang3")
	fmt.Println("#2 found", a)

	accounts := make([]AccountInfo, 0)
	db.Find(&accounts)
	fmt.Println("#3 found", accounts)
}

