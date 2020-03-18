import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import './Header.css';
import logo from '../../asset/svg/logo.svg';
import ic_user from '../../asset/images/ic_user.png';
import service from './Service.js'
import { message,Button,Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:'loading...'
    };
  }

  componentDidMount(){
    this.loadSelfInfo();
  }

  loadSelfInfo = ()=>{
    // service.getSelfUserInfo()
    //   .then((req) => {
    //     let res = req.data;
    //     if(!res || res.code !== 200){
    //       message.error(''+res.message);
    //     }
    //     console.log("res = "+JSON.stringify(res));
    //     let { name } = res.data;
    //     this.setState({
    //       username:name,
    //     });
    //   })
    //   .catch( (error)=> {
    //     console.log("error3: "+error.message);
    //     this.setState({
    //       username:'加载失败'
    //     })
    //     message.error('用户信息加载失败'+error);
    //   });
  }

  handleMenuClick = e => {
    if (e.key === 'logout') {
      this.handleLogout();
    }
  };

  handleLogout=()=>{
    global.storage.removeItem('Authorization');
    this.props.history.push("/login");
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">退出登录</Menu.Item>

      </Menu>
    );

    return (
      <header className="app-header">
        <img className="App-logo" src={logo} alt="" />
        <a className="app-header-title" href="/home">{service.title}</a>
        <span className="App-sub-title">{service.sub_title}</span>
        <div className="app-header-center-item"></div>


        <Button type="primary"  shape="round">写文章</Button>
      </header>
    );
  }
}

// <Dropdown overlay={menu}>
//       <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//         <img className="ic-user" src={ic_user} alt="" />
//         <DownOutlined />
//       </a>
//   </Dropdown>


export default withRouter(Header);
