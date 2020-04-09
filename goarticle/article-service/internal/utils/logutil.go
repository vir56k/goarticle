package utils

import (
	"os"
	"time"
)

func todayFileName() string{
	today := time.Now().Format("2006-01-02")
	return "LOG_"+today + ".txt"
}

func OpenLogFile() *os.File{
	fileName := todayFileName()
	f, err := os.OpenFile(fileName,os.O_CREATE|os.O_WRONLY|os.O_APPEND,0666)
	if err != nil {
		panic(err)
	}
	return f
}

/**
写日志信息
*/
func LogInfo(format string, args ...interface{}){
}