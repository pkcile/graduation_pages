/*
 * @Author: 王朋坤
 * @Date: 2022-04-08 08:45:47
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-08 08:48:22
 * @FilePath: /graduation-project-master/src/api/publish/index.js
 * @Description: 
 */
import request from "@/api/request.js";

export function studentQuery(params){
  return request.get(`${process.env.VUE_APP_POSITION_PATH}/user/registerStudynthQuery`, {params});
}