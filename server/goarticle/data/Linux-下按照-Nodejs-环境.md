# 打开官网
	https://nodejs.org/en/

# 找到下载URL
	https://nodejs.org/download/release/v11.10.0/node-v11.10.0-# linux-x64.tar.xz

#安装
	
	wget https://nodejs.org/download/release/v11.10.0/node-v11.10.0-linux-x64.tar.xz --no-check-certificate
	xz -d node-v11.10.0-linux-x64.tar.xz 
	tar -xvf node-v11.10.0-linux-x64.tar 

# 添加软连接

	ln -s /opt/node-v11.10.0-linux-x64/bin/node /usr/local/bin/node
	ln -s /opt/node-v11.10.0-linux-x64/bin/npm /usr/local/bin/npm

# 建议配置环境变量
  修改全局的环境变量 /etc/profile  文件

    vi /etc/profile 
  
  加入下面设置信息

    export NODE_HOME=/opt/node-v11.10.0-linux-x64
    export PATH=$NODE_HOME/bin:$PATH

# 完工
