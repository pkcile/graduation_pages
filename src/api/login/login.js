/*
 * @Author: your name
 * @Date: 2021-10-14 19:56:41
 * @LastEditTime: 2021-10-16 14:28:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/login/login.js
 */

import request from "@/api/request.js";

function login(params){
  // params = {"queryStudent":[{"username": "nur","select": "1"}], "task_id": "21"};
  console.log(params);
  return request.get('/api/position/login/', {params});
}

// export default function login(params){
//   return request.post('/api/position/login/', params);
// }

export default login;