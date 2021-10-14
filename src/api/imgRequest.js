/*
 * @Author: your name
 * @Date: 2021-10-14 19:56:41
 * @LastEditTime: 2021-10-14 23:05:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/imgRequest.js
 */

import axios from 'axios'
import store from '../store'
import {Message} from 'element-ui'

// 弹出错误提示
function showErrMsg(errorMsg) {
  Message({
    showClose: true,
    message: errorMsg,
    type: 'error',
    offset: "250"
  });
}

const baseURL = '/';

// 创建axios实例
const ajax = axios.create({
  baseURL,
  timeout: 20000,
});

// 请求 拦截器
ajax.interceptors.request.use(config => {
  let token = store.state.user.token;
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, error => {
  console.log('请求拦截器', error)
});

// 响应 拦截器
ajax.interceptors.response.use(response => {
  response.data['fileName'] = window.decodeURI(response.headers['content-disposition'].split('=')[1]);
  return response.data;
}, error => {
  let errorMsg = error.message;
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data);
  } else {
    // 服务器没有响应
    console.log('server', errorMsg);
  }
  showErrMsg(errorMsg);
  return Promise.reject(errorMsg)
});
export default ajax;

