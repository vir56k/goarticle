import HTTP from '../../../../common/HttpUtil'

const URL_USER_SELF = "/users/self";//用户信息

var service = {
    "title":"Goarticle",
    "sub_title":"个人知识管理系统.",

    getSelfUserInfo: ()=>{
      return HTTP.get(HTTP.getHostURL(URL_USER_SELF));
    }
}
export default service;
