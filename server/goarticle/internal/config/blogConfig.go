package config

import (
	"encoding/json"
	"io/ioutil"
)

type BlogConfig struct {
	Cnblog Cnblog
}

type Cnblog struct {
	UserName string	`json:"userName"`
	Password string `json:"password"`
}

func GetBlogConfig() (*BlogConfig,error) {
	data,err := ioutil.ReadFile("config.json")
	if err != nil {
		return nil,err
	}
	b := BlogConfig{}
	err = json.Unmarshal(data, &b)
	if err != nil {
		return nil,err
	}
	return &b,nil
}