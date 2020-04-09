import 'babel-polyfill'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch, Link ,Redirect} from "react-router-dom";
import './App.css';
import setup from './common/setup.js';
//页面
import LoginPage from './pages/LoginPage/LoginPage.js';
import HomePage from './pages/Home/HomePage/HomePage.js';
import ManagePage from './pages/Manage/ManagePage.js';
import SignupPage from './pages/SignupPage/SignupPage.js';


//国际化
import { ConfigProvider , message} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Auth from './domain/Auth.js';

moment.locale('zh-cn');


// 构建需要
console.log(`process.env.REACT_APP_ROUTER_BASE_NAME is ${process.env.REACT_APP_ROUTER_BASE_NAME}`);
const routerConfig = !process.env.REACT_APP_ROUTER_BASE_NAME?{}:{
  basename:process.env.REACT_APP_ROUTER_BASE_NAME
};

export default function App() {
    return (
      <ConfigProvider locale={zh_CN}>
        <Router {...routerConfig}>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <PrivateRoute path="/manage">
                <ManagePage />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </ConfigProvider>
    );
}



function PrivateRoute({ children, ...rest }){
  return (
      <Route
        {...rest}
        render={({ location }) =>
          Auth.isAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}
