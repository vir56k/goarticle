package utils

import (
	"github.com/iris-contrib/blackfriday"
)

/**
解析 Markdown 格式 转换成  html
 */
func ParseMarkdownToHtml(input []byte) string {
	output := blackfriday.Run(input, blackfriday.WithNoExtensions())
	return string(output)
}
