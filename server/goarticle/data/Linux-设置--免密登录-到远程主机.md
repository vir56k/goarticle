[ linux 设置  免密  登录到远程主机  ]

# 1，生成本地 ssh

      ssh-keygen

# 2， 查看ssh key 

    cat ~/.ssh/id_rsa.pub

# 3, 用ssh-copy-id将公钥复制到远程机器中

在控制台执行:

     ssh-copy-id -i ~/.ssh/id_rsa.pub  root@192.168.135.89

// 执行完毕后  ,会要求你输入密码,输入密码后会看到如下提示

    /usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed:     "/Users/zhangyunfei/.ssh/id_rsa.pub"

    /usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed

    /usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys

    root@192.168.135.84's password: 

// 这时，输入密码，成功则看到下面：

    Now try logging into the machine, with:  "ssh 'root@192.168.135.84'"

    and check to make sure that only the key(s) you wanted were added.

# 4, 验证可用

    ssh root@192.168.135.89]

// 发现不会再提示你输入密码了
