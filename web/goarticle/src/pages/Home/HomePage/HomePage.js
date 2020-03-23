import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Header from '../components/Header/Header.js';
import './HomePage.css';
import Welcome from '../Welcome/Welcome.js';
import ArticleList from '../Articles/ArticleList.js';
import Article from '../Articles/Article.js';
import AriticleBrowser from '../Articles/AriticleBrowser.js';

function Home() {
  let { path, url } = useRouteMatch();
  console.log(`path=${path}, uurl=${url}`)
  console.log(`${path}article`);
  return (
    <div className="app_content">
      <Header/>
      <Switch>
       <Route exact path={path}>
         <AriticleBrowser />
       </Route>
       <Route path={`${path}browser`}>
         <AriticleBrowser />
       </Route>
       <Route path={`${path}article/list`}>
         <ArticleList />
       </Route>
       <Route path={`${path}article/:Title`}>
         <Article />
       </Route>
     </Switch>
    </div>
  );
}

export default Home;
