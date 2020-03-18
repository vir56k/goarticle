import HTTP from '../../common/HttpUtil'

const URL_ARTICLE_LIST = "api/articles";//删除用户
const URL_ARTICLE_GET = "api/article";//删除用户
const URL_ARTICLE_NAMES = "api/article/namelist";//删除用户

var service = {

  articleList: ()=>{
    // if(!appName)
    //   throw "缺少必须的参数appName";
    return HTTP.get(HTTP.getHostURL(URL_ARTICLE_LIST),{  });
  },

  articleNameList: ()=>{
    // if(!appName)
    //   throw "缺少必须的参数appName";
    return HTTP.get(HTTP.getHostURL(URL_ARTICLE_NAMES),{  });
  },

  getArticle: (title)=>{
    let url = URL_ARTICLE_GET + "/" + title;
    return HTTP.get(HTTP.getHostURL(url),{  });
  },
}

export default service;
