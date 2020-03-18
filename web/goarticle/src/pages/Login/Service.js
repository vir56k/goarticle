import HTTP from '../../common/HttpUtil'

const URL_LOGIN = "/auth/login";

class Service {

  login(name, password){
    return HTTP.post(HTTP.getHostURL(URL_LOGIN),{name, password});
  }

}
export default new Service();
