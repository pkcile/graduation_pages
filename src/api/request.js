/*
 * @Author: your name
 * @Date: 2021-10-14 19:56:41
 * @LastEditTime: 2021-10-16 14:13:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/request.js
 */

import axios from 'axios'
// import store from '../store'
// import {Notify } from 'vant'

const baseURL = '/';

// 创建axios实例
const request = axios.create({
  baseURL,
  timeout: 50000,
});

export default request;
