import React, { Component } from 'react';
import './Home.css';
import Header from '../../components/Header/Header.js';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import Welcome from '../../pages/Welcome/Welcome.js';
import ArticleList from '../../pages/Articles/ArticleList.js';
import Article from '../../pages/Articles/Article.js';

function Home() {
  let { path, url } = useRouteMatch();
  console.log(`path=${path}, uurl=${url}`)
  console.log(`${path}article`);
  return (
    <div className="app_content">
      <Header/>
      <Switch>
       <Route exact path={path}>
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
