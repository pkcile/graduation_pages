/*
 * @Author: 王朋坤
 * @Date: 2022-04-21 09:15:46
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-21 15:54:21
 * @FilePath: /graduation-project-master/src/utils/monthDay.js
 * @Description:
 */
function getMonthDay(year, month) {
  let monthDay = 0;
  switch (month) {
    case 1:
      monthDay = 31;
      break;
    case 2:
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        monthDay = 29;
      } else {
        monthDay = 28;
      }
      break;
    case 3:
      monthDay = 31;
      break;
    case 4:
      monthDay = 30;
      break;
    case 5:
      monthDay = 31;
      break;
    case 6:
      monthDay = 30;
      break;
    case 7:
      monthDay = 31;
      break;
    case 8:
      monthDay = 31;
      break;
    case 9:
      monthDay = 30;
      break;
    case 10:
      monthDay = 31;
      break;
    case 11:
      monthDay = 30;
      break;
    case 12:
      monthDay = 31;
      break;
    default:
      monthDay = 30;
      break;
  }

  return monthDay;
}

function conventStartEndStamp(dateobj = new Date()) {
  // console.log(Number(dateobj), "datestring");
  if (!Number(dateobj)) {
    console.log(dateobj);
    return [0, 0]
  } 
  else {
    let dateobjStart = new Date(dateobj);
    dateobjStart.setDate(1);
    dateobjStart.setHours(0);
    dateobjStart.setMinutes(0);
    dateobjStart.setSeconds(0);

    let dateobjEnd = new Date(dateobj);
    dateobjEnd.setMonth(dateobjStart.getMonth() + 1);
    dateobjEnd.setDate(1);
    dateobjEnd.setHours(0);
    dateobjEnd.setMinutes(0);
    dateobjEnd.setSeconds(0);

    return [Date.parse(dateobjStart), Date.parse(dateobjEnd)]
  }
}

function convertDate(date = Date.now()) {
  // console.log(Number(date)); // 上游监听待去除
  if(!Number(date)) {
    console.log(date);
    return "";
  }
  else {
    date = new Date(date);
    const dateString =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    " " +
    (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
    ":" +
    (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()) +
    ":" +
    (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds());
    //  +  ":"  + "00";
    return dateString;
  }

}

console.log(getMonthDay(2021, 2));
console.log(conventStartEndStamp());
// console.log(convertDate());
