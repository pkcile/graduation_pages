/*
 * @Author: your name
 * @Date: 2021-10-14 19:56:41
 * @LastEditTime: 2022-04-08 11:08:26
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/request.js
 */

import axios from 'axios'
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// import store from '../store'
// import {Notify } from 'vant'

// axios取消自检配置
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

const baseURL = '/';

// 创建axios实例
const request = axios.create({
  baseURL,
  timeout: 3000,
});



// request.defaults.withCredentials=true;


// http request 拦截器
request.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      // config.headers.authorization = token  //请求头加上token
      // config.headers.Cookie = "cookie"
    }
    else {
      // config.headers.authorization = 'aabbbccdd'
      // config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
      // config.headers.Cookie = "cookie"
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 添加一个响应拦截器
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default request;
