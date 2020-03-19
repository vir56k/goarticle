import React from 'react';
import './AriticleBrowser.css';
import { message } from 'antd';
import service from './service.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useState,  useEffect } from 'react';
import ArticleView from './ArticleView.js';

export default function Page() {
  return (
    <Router>
      <div class="ariticleBrowser">
        <div class="left">
          <Left/>
        </div>
        <div class="right">
          <Switch>
            <Route path="/browser/:Title" children={<Child />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Left(){
  const [list, setList] = useState([]);

  useEffect(() => {
    service.articleNameList().then((response)=>{
        let { Code,Message,Data } = response.data;
        if(Code !== 200){
          message.error(Message);
          return;
        }
        setList(Data)
    }).catch((err)=>{
        message.error(err+'');
      }
    );
 },[]);

  return (
    <div>
      <TheList datalist={list} />
    </div>
  )
}

function TheList({datalist}){
  const theItems = datalist.map((item,i)=>{
    let { ID,Title,Body,Url } = item;
    Url = "/browser/"+Title;
    return(
      <li>
        <Link to={Url}>
            {Title}
        </Link>
      </li>
    );
  });
  return (
    <ul>{theItems}</ul>
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { Title } = useParams();

  return (
    <div>
      <ArticleView Title={Title}/>
    </div>
  );
}
