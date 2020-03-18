/*********************************************
BuildConfig

描述：在商业软件中，经常需要根据不同构建类型切换不同配置项，比如 HostURl。
    可能的构建类型有： 开发，uat,正式包等。
注意：需要在命令提示符状态下出入环境变量 REACT_APP_BUILD_TYPE 变量。
    请参阅package.json
使用示例：
  import $buildConfig from 'BuildConfig.js'
  const HOST_URL = $buildConfig.HostURL;
*********************************************/

//开发 环境配置
const env = {
  "develop":{
    HostURL:'http://localhost:8080/'
  },
  "qa":{
    HostURL:'http://localhost:8080/'
  },
  "uat":{
    HostURL:'http://localhost:8080/'
  },
  "production":{//production 环境配置
    HostURL:'http://localhost:8080/'
  }
}

//默认自动条件一个属性 BuildType = 对应的key
Object.keys(env).forEach(function(key){
    env[key].BuildType = ''+key;
});

//我们约定，开发包传入 develp, UAT传入 uat, 正式包传入 production
const buildType = process.env.REACT_APP_BUILD_TYPE || 'develop';
console.log('环境变量中的 BuildType = ' + buildType);

//根据不同的 buildType，将击中上面的配置项目
let $buildConfig = env[buildType];

console.log('配置文件中的 BuildType = '+$buildConfig.BuildType);
console.log('配置文件中的 HostURL = '+$buildConfig.HostURL);
export default $buildConfig;
