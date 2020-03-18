const {
  isToday,
  isYesterday,
  formatDateString
} = require('../utils/DateUtil');

 let t1 = new Date(2019,2,14);
 console.log('isToday = '+isToday(t1));
 console.log('isYesterday = '+isYesterday(t1));
 console.log('formatDateString = '+formatDateString(t1));

 let t2 = new Date(2019,2,13);
 console.log('isToday = '+isToday(t2));
 console.log('isYesterday = '+isYesterday(t2));
 console.log('formatDateString = '+formatDateString(t2));

 let t3 = new Date(2018,2,13);
 console.log('isToday = '+isToday(t3));
 console.log('isYesterday = '+isYesterday(t3));
 console.log('formatDateString = '+formatDateString(t3));
