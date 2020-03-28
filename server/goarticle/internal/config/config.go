package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type Config struct {
	Cnblog      Cnblog
	MySqlConfig MySqlConfig
}

type Cnblog struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

type MySqlConfig struct {
	User         string `json:"user"`
	Password     string `json:"password"`
	Host         string `json:"host"`
	DatabaseName string `json:"databaseName"`
}

func GetBlogConfig() Cnblog {
	return config.Cnblog
}

func GetMySqlConfig() MySqlConfig {
	return config.MySqlConfig
}

var config Config

func init() {
	fmt.Println("# on config init")
	data, err := ioutil.ReadFile("config.json")
	if err != nil {
		panic("读取配置文件失败，config.json")
	}
	b := Config{}
	err = json.Unmarshal(data, &b)
	if err != nil {
		panic("解析配置文件失败，config.json")
	}
	config = b
	fmt.Println("# on config init DONE!")
}
