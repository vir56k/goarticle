import React from 'react';
import {
  Link,
  useParams,
} from "react-router-dom";
import { useState } from 'react';
import service from './service.js';
import { message } from 'antd';


export default function ArticleView({Title}) {
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
        if(!Data.article){
          message.error("文章信息获取失败");
          return
        }
        let {title,body} = Data.article;
        setTitle(title);
        setBody(body);
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
              <article className='body' dangerouslySetInnerHTML={{__html:body }}></article>
          </div>
        </div>
      </div>
    );
}
