import React from 'react';
import './Article.css';
import ArticleView from './ArticleView.js';

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

export default function Page(){
  let { Title } = useParams();
  console.log(""+Title);
  return(
    <ArticleView Title={Title}/>
  )
}
