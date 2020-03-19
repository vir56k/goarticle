import HTTP from '../../common/HttpUtil'

const URL_ARTICLE_LIST = "api/articles";
const URL_ARTICLE_GET = "api/article";// 获得文章信息，文章内容是html
const URL_ARTICLE_ORIGIN = "api/article/origin";//获得文章信息，文章内容是 原始字符
const URL_ARTICLE_NAMES = "api/article/namelist";
const URL_ARTICLE_SAVE = "api/article/save";


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

  saveArticle: ({title,value})=>{
    let url = URL_ARTICLE_SAVE;
    return HTTP.post(HTTP.getHostURL(url),{title,value});
  },

  getArticleOrigin: (title)=>{
    let url = URL_ARTICLE_ORIGIN + "/" + title;
    return HTTP.get(HTTP.getHostURL(url),{  });
  },
}

export default service;
