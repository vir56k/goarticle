

Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}


function isToday(theDate){
  // let reportDate2 = ;
  //(new Date(reportDate)).Format("MM月dd日 hh:mm");
  let now = new Date();
  let today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  let newDay = new Date(theDate.getFullYear(),theDate.getMonth(),theDate.getDate());
  if(today.getTime() === newDay.getTime()){
    return true;
  }
  return false;
}

function isYesterday(theDate){
  let t = new Date((new Date()).getTime()-1000*60*60*24);
  let yesterday = new Date(t.getFullYear(),t.getMonth(),t.getDate());
  let theDay = new Date(theDate.getFullYear(),theDate.getMonth(),theDate.getDate());
  if(yesterday.getTime() === theDay.getTime()){
    return true;
  }
  return false;
}

function formatDateString(theDate){
  if(isToday(theDate)){
    //今天
    return '今天'+theDate.Format("hh:mm");
  }
  if(isYesterday(theDate)){
    //昨天
    return '昨天'+theDate.Format("hh:mm");
  }
  return theDate.Format("MM月dd日 hh:mm");
}

module.exports = {
  isToday,
  isYesterday,
  formatDateString
};
