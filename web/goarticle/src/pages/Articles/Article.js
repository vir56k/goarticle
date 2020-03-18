import React, { Component } from 'react';
import './Article.css';
import { message } from 'antd';
import service from './service.js';

import Header from '../../components/Header/Header.js';
import {
  Link,
  useParams,
} from "react-router-dom";
import { useState } from 'react';

const EmptyView = (
  <div className="eslint_div">
    暂无数据
  </div>
);


function Page() {
  let { Title } = useParams();
  console.log(""+Title);
  // 声明一个叫 "count" 的 state 变量
  const [title, setTitle] = useState("加载中");
  const [body, setBody] = useState("加载中");

  var loadArticles = ()=>{
    service.getArticle(Title).then((response)=>{
        let { Code,Message,Data } = response.data;
        if(Code !== 200){
          message.error(Message);
          return;
        }
        let {Title,Body} = Data;
        setTitle(Title);
        setBody(Body);
    }).catch((err)=>{
        message.error(err+'');
      }
    );
  }
  loadArticles();

    return (
      <div className="ariticlePage">
        <div className="pageConent">
          <div className='ariticle'>
              <h1 className='title'>{title}</h1>
              <article className='body'>{body}</article>
          </div>
        </div>
      </div>
    );
}

export default Page
