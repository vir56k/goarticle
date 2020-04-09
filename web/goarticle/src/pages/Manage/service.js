import HTTP from '../../common/HttpUtil'


const URL_ARTICLE_ORIGIN = "api/protected/article/origin";//获得文章信息，文章内容是 原始字符
const URL_ARTICLE_NAMES = "api/protected/articles/namelist";
const URL_ARTICLE_SAVE = "api/protected/article/save";


var service = {


  articleNameList: ()=>{
    // if(!appName)
    //   throw "缺少必须的参数appName";
    return HTTP.get(HTTP.getHostURL(URL_ARTICLE_NAMES),{  });
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
