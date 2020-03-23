import React, { Component } from 'react';
import './ArticleList.css';
import { message } from 'antd';
import service from './service.js';

import {
  Link
} from "react-router-dom";

const EmptyView = (
  <div className="eslint_div">
    暂无数据
  </div>
);

//分类列表组件
function TheList(props){
  var datalist = props.datalist;
  //处理外部事件回调
  var handlItemClick1 = (e)=>{
    if(props.onSelected){
      props.onSelected(e.target.value);
    }
  };
  if(!datalist || datalist.length===0){
    return EmptyView;
  }
  const theItems = datalist.map((item,i)=>{
    let { ID,Title,Body,Url } = item;
    Url = "/article/"+Title;
    return(
        <div className='item'>
          <Link to={Url}>
            <h1 className='title'>{Title}</h1>
          </Link>
          <article className='body'>{Body}</article>
        </div>
    );
  });
  return (
      <div className="list">
        {theItems}
      </div>
  );
}

class Page extends Component {
  state={
    datalist:[]
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    this.loadArticles();
  }

  loadArticles = ()=>{
    service.articleList().then((response)=>{
        let { Code,Message,Data } = response.data;
        if(Code !== 200){
          message.error(Message);
          return;
        }
        this.setState({
          datalist:Data
        });
    }).catch((err)=>{
        message.error(err+'');
      }
    );
  }

  render() {
    const { datalist } = this.state;
    return (
      <div className="ariticleListPage">
        <div className="articleDiv">
          <div className="pageTitle">文章列表：</div>
          <TheList datalist={datalist}/>
        </div>
      </div>

    );
  }
}

export default Page;
