/*
 * @Author: 王朋坤
 * @Date: 2022-04-09 10:42:07
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-06 21:17:28
 * @FilePath: /graduation-project-master/src/api/usercontrol/index.js
 * @Description: 
 */
import request from "@/api/request.js";

export  function registerStudynthQuery(params){
  return request.get( `${process.env.VUE_APP_POSITION_PATH}/user/registerStudynthQuery`, {params});
}

export  function registerStudynthDelete(params){
  return request.get( `${process.env.VUE_APP_POSITION_PATH}/user/registerStudynthDelete`, {params});
}

export function registerStudynthUpdate(params) {
  return new Promise((resolve) => {
    request
    // http://localhost:9000/user/registerStudynthUpdate?studynth=201824803002&role=%E7%AE%A1%E7%90%86%E5%91%98
      .get(`${process.env.VUE_APP_POSITION_PATH}/user/registerStudynthUpdate`, {
        params: {
          studynth: params.studynth,
          name: params.name,
          classname: params.classname,
          role: params.role,
        },
        
      })
      .then((returnData) => {
        resolve(returnData);
      })
      .catch(data => {
        resolve("服务器错误，请稍后访问");
      })
  });
}