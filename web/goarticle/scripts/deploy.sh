# 在本机开发，通过 修改hosts文件映射 到 my_rel.com
TheHost=rel.com
#TheHost=192.168.1.11

#CurrentDir=`pwd`
#echo "CurrentDir=${CurrentDir}"
workdir=$(cd $(dirname $0); cd ..; pwd)
echo "workdir=${workdir}"

cd ${workdir}

node -v
cnpm  -v
#安装模块
cnpm i
PUBLIC_URL=/managerWebMain REACT_APP_ROUTER_BASE_NAME=/managerWebMain yarn build

rm -f build.tar
tar -cvf build.tar build


file="${workdir}/build.tar"
# -f 参数判断 $file 是否存在
if [ ! -f "$file" ]; then
  echo "$file is not exist !!!!!"
else
  echo "$file is exist !"
fi

# 发送到远程机器
scp ${file} root@${TheHost}:/usr/local/nginx/html

# 发布到远程
ssh root@${TheHost} >/dev/null 2>&1 <<eeooff

echo "welcome !!"

cd /usr/local/nginx/html
rm -rf managerWebMain

#解压
tar -xvf build.tar
mv build managerWebMain

exit

eeooff


echo done!
