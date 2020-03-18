/************************************************************
* 网络封装类
* 包含： axios的全局配置
使用方法：
1.引入
  import HTTP from ./common/HttpUtil
2.发起网络请求
HTTP.get(HTTP.getHostURL(YOUR_URL)).then().catch();
HTTP.post(HTTP.getHostURL(YOUR_URL,{'key':'val'})).then().catch();

*************************************************************/
import axios from 'axios';
import { HOST_URL, getHostURL } from './HostUtil.js';

//增加一个转换器，将 json的requst参数转换成 form格式的参数
axios.defaults.transformRequest = function (data) {
      let ret = '';
      for (let it in data) {
          if(ret !== '')
          ret +='&';
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
      }
      return ret;
};

function getToken(){
  let token = global.storage.getItem("Authorization");
  return token;
}

function createInstance(){
  let token = getToken();
  console.log("##createInstance: "+token);
  var instance = axios.create({
    headers: {'Authorization': token+''}
  });
  return instance;
}


function clearTokenCache(){
  console.log("## clearTokenCache");
  axios.defaults.headers.common['Authorization'] = '';
}

//全局的 axios 默认值
axios.defaults.baseURL = HOST_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN+'';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    const data = JSON.stringify(config.data);
    const token = config.headers.common['Authorization'];
    if(!token){// 如果 config.headers 没发现 token 尝试读取storage
      let tk = getToken();
      console.log('# read token from strage:'+tk);
      if(tk)
        config.headers.common['Authorization'] = ''+tk;
    }
    console.log(`遇到请求拦截器：${config.url}, ${data}, token=${token}, tokenType is ${typeof token}`);
    // console.log(config);
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log("遇到请求错误："+error);
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    const data = JSON.stringify(response.data);
    console.log(`遇到响应拦截器：${response.status}, ${data}`);
    console.log(response);
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log("遇到响应错误："+error);
    return Promise.reject(error);
  });

const HTTP = axios;//createInstance();
HTTP.getToken = getToken;
HTTP.createInstance = createInstance;
HTTP.clearTokenCache = clearTokenCache;
HTTP.getHostURL = getHostURL;

console.log("# HttpUtil 加载完成 ");

export default HTTP;
