/*
 * @Author: 王朋坤
 * @Date: 2022-04-08 10:23:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-11 15:35:25
 * @FilePath: /graduation-project-master/src/api/index/index.js
 * @Description: 
 */
import request from "@/api/request.js";

export function placeserverjudgeapi(params){
  return request.get(`http://123.56.80.80:6080/arcgis/rest/services/schoolLocation/FeatureServer/0/query`, {params});
}

export function updateSingleTaskApi(singletask) {
  return new Promise((resolve) => {
    let singlestamptaskArraySend = [];
    singlestamptaskArraySend.push(singletask);
    request
      .get(`${process.env.VUE_APP_POSITION_PATH}/result/taskSignSingle`, {
        params: { sendArray: singlestamptaskArraySend },
      })
      .then((returnData) => {
        let signResult = {
          result: null,
          status: {
            mark: 0,
            info: "保存失败",
          },
        };

        signResult.result = returnData.data.result
          ? returnData.data.result
          : signResult.result;
        signResult.status = returnData.data.status
          ? returnData.data.status
          : signResult.status;

        resolve(signResult);
      })
      .catch((data) => {
        resolve({
          result: null,
          status: {
            mark: 0,
            info: "保存失败",
          },
        })
        // resolve("服务器错误，请稍后访问");
      })
  });
}