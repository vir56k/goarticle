import React, { Component } from 'react';
import './Login.css';
import service from './Service.js'
import ic_login_user from '../../asset/images/ic_login_user.png';
import ic_login_code from '../../asset/images/ic_login_code.png';
import {withRouter} from "react-router-dom";
import { message } from 'antd';

class Login extends Component {

  componentDidMount() {

  }

  handleGetVerifyCode = ()=>{
    var username = this.refs.u_name.value;
    if(!username){
      message.error('请输入用户名');
      return;
    }
    service.getVerifyCode(username).then((res)=>{
      let { data } = res;
      if(data.resultCode === 200){
        this.GetVerifyCodeSuccess();
      }else{
        message.error(''+res.message);
      }
    }).catch((err)=>{
      message.error(''+err);
    });
  }

  GetVerifyCodeSuccess = ()=>{
  }

  handleLoginClick =()=> {
    var username = this.refs.u_name.value;
    var verifycode = this.refs.u_password.value;
    // if(!username){
    //   message.error('请输入用户名');
    //   return;
    // }
    // if(!verifycode){
    //   message.error('请输入密码');
    //   return;
    // }
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
     this.onLoginSuccess();
  }

  onLoginSuccess =()=>{
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="login_container1">
          <div className="login_form">
            <h3 className="login_title">用户登录</h3>
            <div className="row">
              <div className="icon">
                <img src={ic_login_user} alt="" />
              </div>
              <input ref="u_name" name="name" type="text" placeholder="请输入用户名" value='zhangyunfei'/>
              </div>
            <div  className="row">
              <div className="icon">
                <img src={ic_login_code} alt="" />
              </div>
              <input ref="u_password" name="password" type="password" placeholder="请输入密码"/>
                </div>
            <div className="row">
              <button onClick={this.handleLoginClick} className="button_submit" id="btn_submit" type="button">登录</button>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Login);
