# goarticle
一个go实现的文章编辑工具，适用于个人知识管理

## 数据存储方式
- 文章以文件保存
- 数据库使用 mysql

## 相关框架说明

- 采用 go iris 框架作为 web服务
- gorm 是一个 orm 框架
- 使用 blackfriday 将 markdown 格式文本转成HTML
- 使用 goquery 框架，以 xpath 方式解析 xml



# 参考文档
## gorm
gorm 相关文档速查
http://gorm.book.jasperxu.com/
 

删除所有容器
sudo docker rm $(docker ps -a -q) -f

c