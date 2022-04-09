/*
 * @Author: 王朋坤
 * @Date: 2022-04-09 10:42:07
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-09 10:47:00
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