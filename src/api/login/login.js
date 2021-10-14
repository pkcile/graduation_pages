/*
 * @Author: your name
 * @Date: 2021-10-14 19:56:41
 * @LastEditTime: 2021-10-15 00:00:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/login/login.js
 */

import ajax from "@/api/request.js";
/**
 * 获取机构树
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
 export default function login(params){
  return ajax.post('/api/position/login/', {username: "pkcile", password: "1234"});
}