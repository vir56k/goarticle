package main

import (
	"context"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"log"
	"user-service/internal/mq"
	pb "user-service/proto/user"
)

type handler struct {
	repo         Repository
	tokenService *TokenService
	broker       mq.Broker
}

// 新建用户
func (h *handler) Create(ctx context.Context, user *pb.User, resp *pb.Response) error {
	// 生成一个 加密后的密码
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	// 使用新密码
	user.Password = string(hashedPwd)
	// 保存到数据库
	if err := h.repo.Create(user); err != nil {
		return nil
	}
	// 返回新的用户信息
	resp.User = user
	h.onUserCreateSuccess(user)
	return nil
}

// 获得单个用户信息
func (h *handler) Get(ctx context.Context, req *pb.User, resp *pb.Response) error {
	u, err := h.repo.Get(req.Id)
	if err != nil {
		return err
	}
	resp.User = u
	return nil
}

// 获得多个用户信息
func (h *handler) GetAll(ctx context.Context, req *pb.Request, resp *pb.Response) error {
	users, err := h.repo.GetAll()
	if err != nil {
		return err
	}
	resp.Users = users
	return nil
}

// 验证用户合法性
func (h *handler) Auth(ctx context.Context, req *pb.User, resp *pb.Token) error {
	log.Println("## handle Auth", req.Name, req.Password)
	u, err := h.repo.GetByName(req.Name)
	if err != nil {
		return err
	}
	log.Print("find", u)
	log.Print("准备对比", u.Password, "----", req.Password)
	// 进行密码验证
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(req.Password)); err != nil {
		log.Println("密码错误")
		return err
	}
	t, err := h.tokenService.Encode(u)
	if err != nil {
		log.Println("生成toke错误")
		return err
	}
	log.Println("return", t)
	resp.Token = t
	return nil
}

// 验证token合法性
func (h *handler) ValidateToken(ctx context.Context, token *pb.Token, resp *pb.Token) error {
	log.Println("ValidateToken", token)
	_, err := h.tokenService.Decode(token.Token)
	if err != nil {
		log.Print("# token 验证失败.")
		resp = &pb.Token{Valid: false, Errors: &pb.Error{Code: 500, Description: "token 验证失败."}}
		return err
	} else {
		log.Print("# token token有效.")
		*resp = pb.Token{Valid: true, Token: token.Token}
	}
	return nil
}

/**
当创建用户成功时
*/
func (h *handler) onUserCreateSuccess(user *pb.User) {
	bytes, err := json.Marshal(user)
	if err != nil {
		log.Println("json.Marshal error", err)
		return
	}
	h.broker.Publish(string(bytes))
}
