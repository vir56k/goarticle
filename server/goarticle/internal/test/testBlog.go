package main

import (
	"fmt"
	"goarticle/internal/metaweblog"
	"strings"
)

const getUserRes = `
<?xml version="1.0"?>
<methodResponse>
  <params>
    <param>
      <value>
        <array>
          <data>
            <value>
              <struct>
                <member>
                  <name>blogid</name>
                  <value>
                    <string>59143</string>
                  </value>
                </member>
                <member>
                  <name>url</name>
                  <value>
                    <string>https://www.cnblogs.com/vir56k/</string>
                  </value>
                </member>
                <member>
                  <name>blogName</name>
                  <value>
                    <string>张云飞Vir</string>
                  </value>
                </member>
              </struct>
            </value>
          </data>
        </array>
      </value>
    </param>
  </params>
</methodResponse>
`

func TestUserInfo() {
	u := metaweblog.ParserUserInfo2(strings.NewReader(getUserRes))
	fmt.Println(u)
}

func main() {
	fmt.Println("testing...")
	TestUserInfo()
}
