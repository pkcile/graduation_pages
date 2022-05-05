/*
 * @Author: 王朋坤
 * @Date: 2022-04-11 13:39:43
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-05 22:41:08
 * @FilePath: /graduation-project-master/src/api/init/index.js
 * @Description: 
 */
import request from "@/api/request.js";

export function loginSendDataApi(paramsobj) {
  return new Promise((resolve) => {
    request
      .get(`${process.env.VUE_APP_POSITION_PATH}/user/login`, {
        params: {
          studynth: paramsobj?.studynth,
          password: paramsobj?.password,
        },
        timeout: 3000,
      })
      .then((returnData) => {
        resolve(returnData);
      })
      .catch(() => {
        resolve("服务器错误，请稍后访问");
      })
  });
}

export function userRegisterApi(paramsobj) {
  return new Promise((resolve) => {
    request
      .get(`${process.env.VUE_APP_POSITION_PATH}/user/register`, {
        params: {
          studynth: paramsobj.studynth,
          username: paramsobj.username,
          password: paramsobj.password
        },
      })
      .then((returnData) => {
        console.log(returnData.data);
        resolve(returnData);
      })
      .catch(data => {
        resolve("服务器错误，请稍后访问");
      })
    

  });
}

