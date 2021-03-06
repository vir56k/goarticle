package metaweblog

import (
	"encoding/xml"
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"io"
	"log"
	"strings"
)

type UserInfo struct {
	BlogName string
	Blogid   string
	Url      string
}

/**
迭代器方式读取,很笨重
*/
func parserUserInfo(xmlStr string) *UserInfo {
	m := make(map[string]string)

	state := -1
	key := ""
	val := ""
	docoder := xml.NewDecoder(strings.NewReader(xmlStr))
	for {
		token, err := docoder.Token()
		if err == io.EOF { // 如果读到结尾，则退出循环
			break
		}

		switch tp := token.(type) {
		case xml.StartElement:
			if tp.Name.Local == "member" {
				state = 1
			}
			if state == 1 && tp.Name.Local == "name" {
				state = 2
			}
			if state == 1 && tp.Name.Local == "string" {
				state = 3
			}
			//fmt.Println("--- on StartElement, ", tp.Name.Local, " state=", state)
		case xml.EndElement:
			if tp.Name.Local == "member" {
				state = 0
			}
			if state == 2 && tp.Name.Local == "name" {
				state = 1
			}
			if state == 3 && tp.Name.Local == "string" {
				state = 1
			}
			//fmt.Println("--- on EndElement, ", tp.Name.Local, " state=", state)
		case xml.CharData:
			content := strings.TrimSpace(string([]byte(tp)))
			//fmt.Println("--- on CharData, state=", state, "content=", content)
			if state == 2 {
				key = content
				//fmt.Println("key=", key)
			}
			if state == 3 {
				val = content
				fmt.Println("key=", key, "val=", val)
				m[key] = val
			}
		default:
			//fmt.Println("--default:", token)
		}

	}

	u := UserInfo{}
	u.BlogName = m["blogName"]
	u.Blogid = m["blogid"]
	u.Url = m["url"]
	return &u
}

/**
xpath 方式读取解析
*/
func parserUserInfo2(r io.Reader) UserInfo {
	doc, err := goquery.NewDocumentFromReader(r)
	if err != nil {
		log.Fatal(err)
	}
	u := UserInfo{}
	doc.Find("member").Each(func(i int, s *goquery.Selection) {
		k := s.Find("name").Text()
		v := s.Find("value>string").Text()
		//fmt.Println(k, "=", v)
		if k == "blogName" {
			u.BlogName = v
		}
		if k == "blogid" {
			u.Blogid = v
		}
		if k == "url" {
			u.Url = v
		}
	})
	return u
}

/**
消息
 */
const bodyGetUsersBlogs = `<?xml version="1.0"?>
<methodCall>
  <methodName>blogger.getUsersBlogs</methodName>
  <params>
    <param>
        <value><string></string></value>
    </param>
    <param>
        <value><string>{userName}</string></value>
    </param>
    <param>
        <value><string>{password}</string></value>
    </param>
  </params>
</methodCall>
`

/**
构建消息
 */
func buildBodyGetUsersBlogs(account Account) string {
	bodyStr := strings.Replace(bodyGetUsersBlogs, "{userName}", account.UserName, -1)
	bodyStr = strings.Replace(bodyStr, "{password}", account.Password, -1)
	return bodyStr
}

/**
获得 博客信息
 */
func GetUsersBlogs(account Account) *UserInfo {
	bodyStr := buildBodyGetUsersBlogs(account)

	entity, err := post(account, bodyStr, func(r io.Reader) interface{} {
		return parserUserInfo2(r)
	})
	if err != nil {
		return nil
	}
	u, ok := entity.(UserInfo)
	if !ok {
		return nil
	}
	return &u
}
