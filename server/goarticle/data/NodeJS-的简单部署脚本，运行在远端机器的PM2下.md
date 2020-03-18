# 背景
  完成的NodeJS项目，要部署到远端的测试机，写个脚本如本文。
先克隆代码，通过 PM2 运行 。
可以将此脚本放到 Jenkins 下，设置好触发器，代码一签入即自动执行本脚本，后下发通知。

# ssh 到远端运行的脚本
      export NODE_HOME=/opt/node-v11.10.0-linux-x64
      export PATH=$NODE_HOME/bin:$PATH

      cur=`pwd`
      echo "当前目录是：${cur}"

      cd /root/yunfei/DiscoveryMainService/source

      # 判断文件是否存在
      DIR=discovery_service
      if [ ! -d "$DIR" ]; then
        echo "文件夹不存在，开始克隆"
        git clone git@git.aerohuanyou.com:client/public/discovery_service.git

      fi

      echo "文件夹存在，开始pull"
      cd discovery_service
      git pull

      cur=`pwd`
      echo "当前目录是：${cur}"

      cd discoveryMainService

      cur=`pwd`
      echo "当前目录是：${cur}"

      yarn install
      pm2 delete discovery_server || true
      pm2 start ./src/app.js --name discovery_server
