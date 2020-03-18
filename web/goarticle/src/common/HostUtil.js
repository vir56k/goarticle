/*********************************************
关于 Host 的封装类

声明： 在类中 HostUtil增加新的字段 ，比如本页第14行
导入： import HostUtil from '../common/HostUtil.js';
使用： HostUtil.getHostURL(HostUtil.URL_USER_IMPORT)
*********************************************/

//尝试从 构建配置中读取 HostURL
import $buildConfig from './env.js'
const { HostURL:HOST_URL } = $buildConfig;

    // URL 不要再写到这里，改为写到各个模块去。解耦合
    // URL_VERIFYCODE : "/auth/verifycode",//添加用户

    // 将两个 URL 组成一个
function combineURL(baseURL,lastURL){
  var str = baseURL;
  if (baseURL.substr(baseURL.length-1) !== '/') {
      str += '/';
  }
  if (lastURL.substr(0, 1) === '/') {
      str += lastURL.substr(1);
  }else{
      str += lastURL;
  }
  return str;
}

function getHostURL(lastURL){
    return combineURL(HOST_URL, lastURL);
};


export { HOST_URL, getHostURL, combineURL };
