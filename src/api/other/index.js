/*
 * @Author: 王朋坤
 * @Date: 2022-04-11 13:04:59
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-13 23:30:59
 * @FilePath: /graduation-project-master/src/api/other/index.js
 * @Description: 
 */
import request from "@/api/request.js";

export function tianSearchApi(params){
  return request.get(`//api.tianditu.gov.cn/v2/search`, {params});
}

export function getLocationInformation(geometry) {
  return new Promise((resolve) => {
    // 'https://api.tianditu.gov.cn/geocoder?type=geocode&postStr={"lon":113.383507,"lat":23.132059,"ver":1}&tk=75f0434f240669f4a2df6359275146d2'
    request
      .get(`https://api.tianditu.gov.cn/geocoder?type=geocode`, {
        params: {
          postStr: {
            lon: geometry.longitude,
            lat: geometry.latitude,
            ver: 1
          },
          tk: "c2eac0b552d848155c72b1d3f6aabf36"
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
