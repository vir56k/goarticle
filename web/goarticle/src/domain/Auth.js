
import HTTP from '../common/HttpUtil'

const URL_LOGIN = "/api/login";

class Service {

  login(name, password){
    return HTTP.post(HTTP.getHostURL(URL_LOGIN),{name, password});
  }

}

let service = new Service();

const Auth = {
  isAuthenticated(){
    let token = global.storage.getItem("Authorization");
    return ! ( !token || token === '' || token === null);
  },
  authenticate(name,password,cb){
    if(!name || name==='' || !password || password===''){
      cb(undefined,new Error("请输入账户密码"))
      return;
    }
    service.login(name,password).then((res)=>{
      let { Code,Data,Message } = res.data;
      if(Code === 200){
        console.log("## login code="+Code);
        let { token } = Data;
        global.storage.setItem("Authorization",''+token);
          setTimeout(()=>{
            cb(token,undefined);
          }, 100);
      }else{
        cb(undefined,''+Message);
      }
    }).catch((err)=>{
      console.log("## login err="+err);
      cb(undefined,''+err);
    });
  },
  signout(cb){
    global.storage.removeItem('Authorization');
    setTimeout(cb, 100);
  }
};

export default Auth;
