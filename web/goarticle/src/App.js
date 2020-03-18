import 'babel-polyfill'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch, Link ,Redirect} from "react-router-dom";
import './App.css';
import setup from './common/setup.js';
//页面
import Login from './pages/Login/Login.js';
import Home from './pages/Home/Home.js';

//国际化
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 构建需要
console.log(`process.env.REACT_APP_ROUTER_BASE_NAME is ${process.env.REACT_APP_ROUTER_BASE_NAME}`);
const routerConfig = !process.env.REACT_APP_ROUTER_BASE_NAME?{}:{
  basename:process.env.REACT_APP_ROUTER_BASE_NAME
};

function App() {
    return (
      <ConfigProvider locale={zh_CN}>
        <Router {...routerConfig}>
          <div className="App">
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </ConfigProvider>
    );
}

export default App;
