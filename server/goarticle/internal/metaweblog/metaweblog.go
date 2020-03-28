package metaweblog

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)


const DEBUG = false
const isUseProxy = false //是否启用 代理（抓包用）

type Account struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

type myError struct {
	errStr string
}

func (e myError) Error() string {
	return e.errStr
}

func post(account Account, requestBody string, callback func(reader io.Reader) interface{}) (interface{}, error) {
	userName := account.UserName
	url1 := buildHostUrl(userName)
	client := buildHttpClient()

	// fmt.Println(url1, bodyStr)
	resp, err := client.Post(url1, "text/plain", strings.NewReader(requestBody))
	defer resp.Body.Close()
	if err != nil {
		return nil, err
	}
	if resp.StatusCode != 200 {
		fmt.Println("error, StatusCode=", resp.StatusCode)
		return nil, myError{errStr: "http error"}
	}
	//if DEBUG {
	//	printResponseBody(url1, resp.Body)
	//}
	return callback(resp.Body), nil
}

//func printResponseBody(urlStr string, r io.Reader) {
//	data, err := ioutil.ReadAll(r)
//	if err != nil {
//		return
//	}
//	fmt.Println(urlStr, string(data))
//}


func buildHostUrl(userName string) string {
	url1 := "http://rpc.cnblogs.com/metaweblog/{userName}"
	url1 = strings.Replace(url1, "{userName}", userName, -1)
	return url1
}

func buildHttpClient() *http.Client {
	if !isUseProxy {
		return &http.Client{}
	}
	proxy := func(_ *http.Request) (*url.URL, error) {
		return url.Parse("http://127.0.0.1:8888")
	}
	transport := &http.Transport{Proxy: proxy}
	client := &http.Client{Transport: transport}
	return client
}
