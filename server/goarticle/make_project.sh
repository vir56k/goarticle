################  Go 目录 ################

#该项目的主程序.
mkdir cmd

# 程序和库的私有代码. 这里的代码都是你不希望被别的应用和库所引用的.
mkdir internal

# 可以被其他外部应用引用的代码
mkdir pkg

# 应用的依赖
mkdir vendor

################  Service 应用目录 ################
# OpenAPI/Swagger 规范, JSON schema 文件, 协议定义文件.
mkdir api

################   Web 应用目录 ################
# Web 应用标准组件: 静态 Web 资源, 服务端模板, 单页应用.
mkdir web

################ 常规应用目录 #####################

# 配置文件模板或者默认配置.
mkdir configs

# 系统初始化 (systemd, upstart, sysv) 及进程管理/监控 (runit, supervisord) 配置.
mkdir init

# 执行各种构建, 安装, 分析等其他操作的脚本.
mkdir scripts

#打包及持续集成.
#   将 cloud (AMI), container (Docker), OS (deb, rpm, pkg) 包配置放在 /build/package 目录下.
#   将 CI (travis, circle, drone) 配置和脚本放在 /build/ci
mkdir build

# IaaS, Paas, 系统, 容器编排的部署配置和模板 (docker-compose, kubernetes/helm, mesos, terraform, bosh)
mkdir deployments

# 额外的外部测试软件和测试数据.
mkdir test

################ 其他目录 ################

# 用户及设计文档 (除了 godc 生成的文档).
mkdir docs

# 项目的支持工具. 注意, 这些工具可以引入
mkdir tools

# 应用或者库的示例文件.
mkdir examples

# 外部辅助工具, forked 代码, 以及其他第三方工具 (例如: Swagger UI)
mkdir third_party

# Git hooks.
mkdir githooks

# 其他和你的代码仓库一起的资源文件 (图片, logo 等).
mkdir assets

# This is the place to put your project's website data if you are not using Github pages.
mkdir website