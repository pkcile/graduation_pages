/*
 * @Author: your name
 * @Date: 2021-10-14 19:56:41
 * @LastEditTime: 2021-10-14 23:40:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/request.js
 */

import axios from 'axios'
// import store from '../store'
// import {Notify } from 'vant'

// // 弹出错误提示
// function showErrMsg(errorMsg) {
//   Notify({
//     message: errorMsg,
//     type: 'danger'
//   });
// }

// // 打印错误提示
// function errorLog(data, config) {
//   let errorObj = {
//     url: config.url,
//     code: data.code,
//     msg: data.message,
//   };
//   config.params && (errorObj.params = config.params);
//   config.data && (errorObj.data = JSON.parse(config.data));
//   console.log(errorObj);
// }

// const reLogin = ['GW1004'];
const baseURL = '/';

// 创建axios实例
const ajax = axios.create({
  baseURL,
  timeout: 50000,
});

// // let flag = true;
// // 请求 拦截器
// ajax.interceptors.request.use(config => {
//   let token = store.state.user.token;
//   if (token) {
//     config.headers['Authorization'] = token;
//   }
//   return config;
// }, error => {
//   console.log('请求拦截器', error)
// });

// // 响应 拦截器
// ajax.interceptors.response.use(response => {
//   // console.log(response.config.url,response.data);
//   const {data} = response;
//   if (data.type === "FeatureCollection"||data.type === "Feature") { //筛选是否为地图数据请求
//     return response.data;
//   } else if (data.code || data.status || data.status === undefined) {
//     return response.data;
//   } else {
//     let errorMsg = data.message;
//     if(errorMsg){
//       if (errorMsg.indexOf('凭据') > -1) {
//         showErrMsg("登录凭据已过期，正在跳转登录页面，请稍后...");
//         store.dispatch('user/logoutAct');
//         this.$router.push("/login")
//       }else if(errorMsg === '权限不足'){
//         showErrMsg("登录权限不足，正在跳转登录页面，请稍后...");
//         store.dispatch('user/logoutAct');
//         this.$router.push("/login")
//       }else {
//         showErrMsg(errorMsg)
//       }
//     }else{
//       //其他
//       errorLog(data, response.config)
//     }
//   }
// }, error => {
//   if (error.response) {
//     if(error.response.data.message){
//       // 请求已发出，但服务器响应的状态码不在 2xx 范围内
//       if (error.response.data.message.indexOf('凭据') > -1 && error.response.data.status === false) {
//         showErrMsg("登录凭据已过期，正在跳转登录页面，请稍后...");
//         store.dispatch('user/logoutAct');
//         this.$router.push("/login")
//       }else if(error.response.data.message==='权限不足'&& error.response.data.status === false){
//         showErrMsg("登录权限不足，正在跳转登录页面，请稍后...");
//         store.dispatch('user/logoutAct');
//         this.$router.push("/login")
//       }else{
//         showErrMsg(error.message);
//       }
//     }else{
//       //其他
//       console.log(error.response.data);
//     }
//   } else {
//     // 服务器没有响应
//     console.log('server', error.message);
//   }
// });
export default ajax;
