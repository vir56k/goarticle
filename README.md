# goarticle
一个go实现的文章编辑工具，适用于个人知识管理

# web应用功能概要
1. 使用 markdown 格式编辑文章，保存文章
2. 浏览文章
3. 文章在本地以文件形式存在，便于管理
4. 博客园支持MetaWeblog，据此实现和博客园文章同步,新建/编辑/删除文章( 进度10% )

# 技术栈
后端（服务端）
- 使用 Go Module 方式管理依赖
- 采用 go iris 框架作为 web服务
- iris 分组路由
- CORS 处理跨域请求
- 使用 blackfriday 将 markdown 格式文本转成HTML
- 日志错误管理：日志支持写入到物理文件
- 本地化配置文件，以 JSON格式操作配置文件 config.js
- 使用 XML-RPC 的 MetaWeblog 协议接口，实现和博客园文章同步
- 使用 goquery 框架，以 xpath 方式解析 xml

前端
- React 开发实现前端分离
- React Hook 简化状态管理
- React Router 路由 V4.0
- for-editor 作为 markdown 编辑器
- 多环境构建（开发，测试，线上）
- 支持基于 token 的登录，退出登录功能

# 整体结构
采用“前后端分离”的结构：
- server 文件夹 下是服务端代码，用go预研实现。
- web 文件夹 下是前端代码，使用 react 开发。

# Go 工程
Go 工程使用 "go module" 管理依赖。使用 Iris 作为web服务框架。


# 关于
- 欢迎关注我的Github，网址: https://github.com/vir56k
- 欢迎关注我的技术blog，网址：https://www.jianshu.com/u/b05ccb1463c2
- markdown 编辑器 for-editor 地址：https://github.com/kkfor/for-editor
- MetaWeblog协议资料，请阅读:
https://github.com/vir56k/goarticle/blob/master/server/goarticle/MetaWeblog%E5%8D%8F%E8%AE%AE%E8%B5%84%E6%96%99.md
