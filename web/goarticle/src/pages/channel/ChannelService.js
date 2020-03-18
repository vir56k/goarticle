import HTTP from '../../common/HttpUtil'

const URL_ALL = "/channel/list";//删除用户
const URL_ADD = "/channel/add";//删除用户
const URL_EDIT = "/channel/edit";//删除用户
const URL_DELETE = "/channel/delete";//删除用户
const URL_GET_CHANNEL = "/channel/getchannel";//删除用户
const URL_MOVE_RANK = "/channel/moverank";//移动 顺序

var ProjectService = {

  getAll: (appName)=>{
    if(!appName)
      throw "缺少必须的参数appName";
    return HTTP.post(HTTP.getHostURL(URL_ALL),{ appName });
  },

  addChannel: (channel)=>{
    return HTTP.post(HTTP.getHostURL(URL_ADD),channel);
  },

  deleteChannel: (channelID)=>{
    return HTTP.post(HTTP.getHostURL(URL_DELETE),{ channelID });
  },

  editChannel: (channel)=>{
    return HTTP.post(HTTP.getHostURL(URL_EDIT),channel);
  },

  getChannel: (channelID)=>{
    return HTTP.post(HTTP.getHostURL(URL_GET_CHANNEL),{channelID});
  },

  moveRank:(channelID,direction)=>{
    var step = 0;
    if(direction === 'up'){
      step = -1;
    } else if(direction === 'down'){
      step = 1;
    }
    return HTTP.post(
      HTTP.getHostURL(URL_MOVE_RANK),
      {channelID,step}
    );
  }
}





export default ProjectService;
