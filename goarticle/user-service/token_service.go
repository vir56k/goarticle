package main

import (
	"github.com/dgrijalva/jwt-go"
	"time"
	pb "user-service/proto/user"
)

type Authable interface {
	Decode(tokenStr string) (*CustomClaims, error)
	Encode(user *pb.User) (string, error)
}

// 定义 盐
var privateKey = []byte("`hello-zhangyunVir")

// 自定义的 metadata，在加密后作为 JWT 的第二部分返回给客户端
type CustomClaims struct {
	User *pb.User
	// 使用标准的 payload
	jwt.StandardClaims
}

type TokenService struct {
	//repo Repository
}

// 将 JWT 字符串解密为 Claims 对象
func (srv *TokenService) Decode(tokenStr string) (*CustomClaims, error) {
	t, err := jwt.ParseWithClaims(tokenStr, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return privateKey, nil
	})
	// 解密转换类型并返回
	if claims, ok := t.Claims.(*CustomClaims); ok && t.Valid {
		return claims, nil
	} else {
		return nil, err
	}
}

// 将 User 用户信息加密为 JWT 字符串
func (srv *TokenService) Encode(user *pb.User) (string, error) {
	// 1天后过期
	expireTime := time.Now().Add(time.Hour * 24 * 1).Unix()
	claims := CustomClaims{
		user,
		jwt.StandardClaims{
			Issuer:    "com.github.vir56k.srv.user", // 签发者
			ExpiresAt: expireTime,
		},
	}
	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return jwtToken.SignedString(privateKey)
}
