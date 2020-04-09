package com_github_vir56k_srv_user

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

func (user *User) BeforeCreate(scope *gorm.Scope) error {
	uuid := uuid.NewV4()
	return scope.SetColumn("Id", uuid.String())
}
