/*
 * @Author: 王朋坤
 * @Date: 2021-11-12 08:50:14
 * @LastEditTime: 2022-03-21 15:18:27
 * @LastEditors: 王朋坤
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/utils/date.js
 */


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

export { convertDate };