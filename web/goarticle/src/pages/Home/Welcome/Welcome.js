import React, { Component } from 'react';
import './Welcome.css';
import { message } from 'antd';
import {
  Link
} from "react-router-dom";

import shortcutDefault from './imgs/shortcutDefault.png';

const shortcutDataList = [
  {
    title:'GirlAvatar',url:'/home/girlavatar',content:"xxxxx"
  },
  {
    title:'AvatarMore',url:'/home/avatarmore',content:"xxxxx"
  },
  {
    title:'CoupleAvatar',url:'/home/coupleavatar',content:"xxxxx"
  },
]

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
    let { ID,title,url,content } = item;
    return(
      <Link to={url}>
        <div className='item_div' key={i} value={ID+''}>
          <h1 className='name'>{title}</h1>
          <div>{content}</div>
        </div>
      </Link>
    );
  });
  return (
      <div className="list_div">
        {theItems}
      </div>
  );
}

class ShortcutView extends Component {
  state={
    datalist:[]
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      datalist:shortcutDataList
    });
  }

  render() {
    const { datalist } = this.state;
    return (
      <div className="welcome_panel">
        <div className="article_panel">
          <div className="panel_title">文章列表：</div>
          <TheList datalist={datalist}/>
        </div>
      </div>

    );
  }
}

export default ShortcutView;
