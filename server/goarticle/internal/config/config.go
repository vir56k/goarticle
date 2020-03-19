package config


type Config struct {
	LogToFile bool
}

func  Get() Config{
	const logToFile = false  // 是否写入日志到文件

	c := Config{ LogToFile:logToFile }
	return c
}