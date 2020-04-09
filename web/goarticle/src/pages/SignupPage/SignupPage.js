import React, { Component } from 'react';
import './SignupPage.css';
import ic_login_user from '../../asset/images/ic_login_user.png';
import ic_login_code from '../../asset/images/ic_login_code.png';
import ic_mail from '../../asset/images/mail.png';
import {withRouter,Link} from "react-router-dom";
import { message,Button } from 'antd';
import Auth from '../../domain/Auth.js';
import HTTP from '../../common/HttpUtil'

class Login extends Component {

  componentDidMount() {

  }

  handleLoginClick =()=> {
    var name = this.refs.u_name.value;
    var password = this.refs.u_password.value;
    var mail = this.refs.u_mail.value;
    if(!name){
      message.error('请输入用户名');
      return;
    }
    if(!password){
      message.error('请输入密码');
      return;
    }
    if(!mail){
      message.error('请输入mail');
      return;
    }
    let url = "/api/signup";
    HTTP.post(HTTP.getHostURL(url),{name,password,mail}).then((response)=>{
        let { Code,Message,Data } = response.data;
        if(Code !== 200){
          message.error(Message);
          return;
        }
        this.onSignupSuccess();
    }).catch((err)=>{
        message.error(err+'');
      }
    );
  }

  onSignupSuccess =()=>{
    console.log("## onSignupSuccess");
    let history = this.props.history;
    let location = this.props.location;
    let { from } = location.state || { from: { pathname: "/" } };
    console.log("from:"+from.pathname);
    this.props.history.push(from.pathname);
  }

  render() {
    return (
      <div className="signup_page">
          <div className="login_form">
            <h3 className="login_title">注册</h3>
            <div className="row">
              <div className="icon">
                <img src={ic_login_user} alt="" />
              </div>
              <input ref="u_name" name="name" type="text" placeholder="请输入用户名" />
              </div>
            <div  className="row">
              <div className="icon">
                <img src={ic_login_code} alt="" />
              </div>
              <input ref="u_password" name="password" type="password" placeholder="请输入密码"/>
            </div>
            <div  className="row">
              <div className="icon">
                <img src={ic_mail} alt="" />
              </div>
              <input ref="u_mail" name="u_mail" type="text" placeholder="请输入邮箱"/>
            </div>
            <div className="row">
              <button onClick={this.handleLoginClick} className="button_submit" id="btn_submit" type="button">注册</button>
            </div>
            <div className="row">
              <Link to="/login">
                <Button type="link"  className="btnback">
                    返回
                </Button>
              </Link>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Login);
