/*
 * @Author: your name
 * @Date: 2021-10-16 14:30:16
 * @LastEditTime: 2021-10-16 14:30:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/studentTask.js
 */


import request from "@/api/request.js";

export default function studentTask(params){
  return request.get('/api/position/studentTask/', {params});
}