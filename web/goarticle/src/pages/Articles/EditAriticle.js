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
import Editor from 'for-editor'

export default function Page() {
  return (
    <Router>
      <div class="ariticleBrowser">
        <div class="left">
          <Left/>
        </div>
        <div class="right">
          <Switch>
            <Route path="/article/edit/:Title" children={<Child />} />
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
    Url = "/article/edit/"+Title;
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
  console.log("### on Child");
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { Title } = useParams();
  const [val, setVal] = useState("加载中");
  console.log("### Title ="+Title);
  var $vm = React.createRef();

  useEffect(()=>{
    console.log("### on useEffect");

    var loadArticles = ()=>{
      service.getArticleOrigin(Title).then((response)=>{
          let { Code,Message,Data } = response.data;
          if(Code !== 200){
            message.error(Message);
            return;
          }
          let {Title,Body} = Data;
          setVal(Body);
      }).catch((err)=>{
          message.error(err+'');
        }
      );
    }
    loadArticles();
    return ()=>{
      console.log("### on useEffect return");
    }
  },[Title]);



  let handleChange = (value)=> {
    console.log("### on editor handleChange: "+value);
    setVal(value);
  };
  let onSave = (value)=>{
    console.log("### on editor onSave: "+value);
    service.saveArticle({title:Title,value}).then((response)=>{
        let { Code,Message,Data } = response.data;
        if(Code !== 200){
          message.error(Message);
          return;
        }
        message.success("保存成功");
    }).catch((err)=>{
        message.error(err+'');
      }
    );
  };
  let addImg = ($file)=> {
    this.$vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  };

  return (
    <div>
      <p><h1>{Title}</h1></p>
      <Editor
        ref={$vm}
        value={val}
        addImg={addImg}
        onSave={onSave}
        onChange={handleChange} />
    </div>
  );
}
