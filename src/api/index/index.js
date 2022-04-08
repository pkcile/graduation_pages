/*
 * @Author: 王朋坤
 * @Date: 2022-04-08 10:23:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-08 10:28:26
 * @FilePath: /graduation-project-master/src/api/index/index.js
 * @Description: 
 */
import request from "@/api/request.js";

export function placeserverjudgeapi(params){
  return request.get(`http://123.56.80.80:6080/arcgis/rest/services/schoolLocation/FeatureServer/0/query`, {params});
}