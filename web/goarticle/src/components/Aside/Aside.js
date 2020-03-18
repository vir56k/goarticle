import React, { Component } from 'react';
import './Aside.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const DEFAULT_LIST = [
  {"text":"[DEFAULT]","url":"#"},
];

function MenuList(props) {
  const data_list = props.data_list;
  const listItems = data_list.map((it,index) =>
      <li key={index}>
          <Link to={it.url}>{it.text.toString()}</Link>
      </li>
    );
    return (
    <ul className="Aside_MenusList">{listItems}</ul>
  );
}

function Aside(props){
  var menu_list = props.menu_list?props.menu_list:DEFAULT_LIST;
  var { title } = props;
  return (
    <aside className="app-aside">
    <div className="app_name">App Name：{title}</div>
    <MenuList data_list={menu_list} ></MenuList>
    </aside>
  );
}

export default Aside;
