


const Auth = {
  isAuthenticated(){
    let token = global.storage.getItem("Authorization");
    return token && token !== '';
  },
  authenticate(name,password,cb){
    if(!name || name==='' || !password || password===''){
      cb(undefined,new Error("请输入账户密码"))
      return;
    }
    // service.login(username,verifycode).then((res)=>{
    //   let { data } = res;
    //   if(data.code === 200){
    //     global.storage.setItem("Authorization",data.data.token);
    //     this.onLoginSuccess();
    //   }else{
    //     message.error(''+data.message);
    //   }
    // }).catch((err)=>{
    //   message.error(''+err);
    // });
    let token = "TEST"
    global.storage.setItem("Authorization",''+token);
      setTimeout(()=>{
        cb(token,undefined);
      }, 100);
  },
  signout(cb){
    global.storage.removeItem('Authorization');
    setTimeout(cb, 100);
  }
};

export default Auth;
