import React, { Component } from 'react';
import Auth from '../../domain/Auth.js';
import { message,Button,Menu, Dropdown } from 'antd';
import ic_user from '../../asset/images/ic_user.png';
import { DownOutlined } from '@ant-design/icons';


export default function LoginButton(props){
  let logout=()=>{
    Auth.signout(()=>{
      props.history.push("/login");
    });
  }

  let handleMenuClick = e => {
    if (e.key === 'logout') {
      logout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">退出登录</Menu.Item>

    </Menu>
  );
  if(Auth.isAuthenticated()){
    return (
      <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img className="ic-user" src={ic_user} alt="" />
              <DownOutlined />
            </a>
      </Dropdown>
    );
  }else{
    return null;
  }
}
