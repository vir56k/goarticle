Linux 或者  mac 获得本机ip 地址，并写入到文件，可写个 x.sh ，具体脚本如下：

        # 获取 IP
      local_ip=`/sbin/ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:"`

      # 打印
      echo "${local_ip}"

      #  保存到文件
      IP_FILE=rn_mac_mini_ci_host_ip
      echo "${local_ip}" &> ${IP_FILE}

