/*
 * @Author: your name
 * @Date: 2021-10-14 19:56:41
 * @LastEditTime: 2021-10-15 14:00:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/login/login.js
 */

import request from "@/api/request.js";

export default function login(params){
  return request.get('/api/position/login/', {params});
}

// export default function login(params){
//   return request.post('/api/position/login/', params);
// }