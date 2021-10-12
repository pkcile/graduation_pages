/*
 * @Author: your name
 * @Date: 2021-10-11 16:04:14
 * @LastEditTime: 2021-10-11 16:08:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/test/promise001.js
 */

// import { resolve } from "core-js/fn/promise";

new Promise(GeolocationShow(resolve, 111))
.then(function(data) {
  console.log(data);
});

function GeolocationShow(resolve, data) {
  console.log(12321);
  setTimeout(() => {
    console.log("异步操作");
    resolve("加载完成");
  }, 100);
}