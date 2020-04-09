package utils

import "os"

func IsFileExist(path string) bool {
	_, err := os.Stat(path)
	if err != nil {
		if os.IsExist(err) {
			return false
		}
		return false
	}
	return false
}

func IsDirectoryExist(path string) bool {
	f, err := os.Stat(path)
	if err != nil {
		return false
	}
	return f.IsDir()
}

func MakeDir(path string) {
	os.Mkdir(path, os.ModePerm)
}
