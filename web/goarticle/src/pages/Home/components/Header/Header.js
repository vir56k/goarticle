import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import './Header.css';
import logo from '../../../../asset/svg/logo.svg';
import service from './Service.js'
import { message,Button,Menu, Dropdown } from 'antd';
import LoginButton from '../../../Widget/LoginButton.js';


class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:'loading...'
    };
  }

  componentDidMount(){
  }

  handleEdit=()=>{
    this.props.history.push("/manage");
  }


  render() {

    return (
      <header className="app-header">
        <img className="App-logo" src={logo} alt="" />
        <a className="app-header-title" href="/home">{service.title}</a>
        <span className="App-sub-title">{service.sub_title}</span>
        <div className="app-header-center-item"></div>

        <LoginButton/>

        <Button type="primary"  shape="round" onClick={this.handleEdit}>写文章</Button>
      </header>
    );
  }
}



export default withRouter(Header);
