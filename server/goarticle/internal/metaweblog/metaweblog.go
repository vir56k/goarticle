package metaweblog

import (
	"fmt"
	"goarticle/internal/config"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

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

func Post() {
	c, err := config.GetBlogConfig()
	if err != nil {
		fmt.Println(err)
		return
	}
	userName := c.Cnblog.UserName
	password := c.Cnblog.Password
	url1 := "http://rpc.cnblogs.com/metaweblog/{userName}"
	url1 = strings.Replace(url1, "{userName}", userName, -1)

	proxy  := func(_ *http.Request) ( *url.URL, error) {
			return url.Parse( "http://127.0.0.1:8888")
		}
	transport := &http.Transport{Proxy : proxy}
	client := &http.Client{Transport : transport}

	bodyStr  := strings.Replace(bodyGetUsersBlogs, "{userName}", userName, -1)
	bodyStr  = strings.Replace(bodyStr, "{password}", password, -1)
	resp, err := client.Post(url1, "text/plain", strings.NewReader(bodyStr))
	defer resp.Body.Close()
	if err != nil {
		return
	}
	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
	fmt.Println(userName, password, url1, string(data))
}
