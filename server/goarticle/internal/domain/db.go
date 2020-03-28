package domain

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)


func OpenDB() (db *gorm.DB, err error) {
	return gorm.Open("mysql", connectionString)
}

