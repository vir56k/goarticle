# goarticle
一个go实现的文章编辑工具，适用于个人知识管理

# web应用功能概要
1. 使用 markdown 格式编辑文章，保存文章
2. 浏览文章
3. 文章在本地以文件形式存在，便于管理

# 技术栈
后端
- 采用 go iris 框架作为 web服务
- 分组路由
- CORS 跨域请求
- 使用 blackfriday 将 markdown 格式文本转成HTML
- 中间件实现授权访问
- redis 管理登陆会话
- 日志错误管理
- 图片上传，google.uuid 生成文件名
- 使用 Go Module 方式开发

前端
- React 开发实现前端分离
- React Hook 简化状态管理
- React Router 路由
- 多环境构建（开发，测试，线上）

# 整体结构
采用“前后端分离”的结构：
- server 文件夹 下是服务端代码，用go预研实现。
- web 文件夹 下是前端代码，使用 react 开发。

# Go 工程
Go 工程使用 "go module" 管理依赖。使用 Iris 作为web服务框架。


# 关于
欢迎关注我的Github，网址: https://github.com/vir56k
欢迎关注我的技术blog，网址：https://www.jianshu.com/u/b05ccb1463c2
