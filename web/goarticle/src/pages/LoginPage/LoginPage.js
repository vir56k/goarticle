import React, { Component } from 'react';
import './LoginPage.css';
import ic_login_user from '../../asset/images/ic_login_user.png';
import ic_login_code from '../../asset/images/ic_login_code.png';
import {withRouter,Link} from "react-router-dom";
import { message,Button } from 'antd';
import Auth from '../../domain/Auth.js';

class Login extends Component {

  componentDidMount() {

  }

  handleLoginClick =()=> {
    var name = this.refs.u_name.value;
    var password = this.refs.u_password.value;
    if(!name){
      message.error('请输入用户名');
      return;
    }
    if(!password){
      message.error('请输入密码');
      return;
    }
    Auth.authenticate(name,password,(token,err)=>{
      if(err){
        message.error(err);
        return;
      }
      this.onLoginSuccess();
    })
  }

  onLoginSuccess =()=>{
    console.log("## onLoginSuccess");
    let history = this.props.history;
    let location = this.props.location;
    let { from } = location.state || { from: { pathname: "/manage" } };
    console.log("from:"+from.pathname);

    this.props.history.push(from.pathname);
  }

  render() {
    return (
      <div className="login_page">
          <div className="login_form">
            <h3 className="login_title">用户登录</h3>
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
            <div className="row">
              <button onClick={this.handleLoginClick} id="btn_submit" type="button">登录</button>
            </div>
            <div className="row">
              <Link to="/signup">
                <Button type="link" className="signup">
                    注册
                </Button>
              </Link>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Login);
