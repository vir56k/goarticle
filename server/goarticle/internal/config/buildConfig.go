package config


type BuildConfig struct {
	LogToFile bool
}

func  GetBuildConfig() BuildConfig{
	const logToFile = false  // 是否写入日志到文件

	c := BuildConfig{ LogToFile:logToFile }
	return c
}