/*
 * @Author: 王朋坤
 * @Date: 2022-04-21 15:59:53
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-07 15:54:32
 * @FilePath: /graduation-project-master/src/api/mine/index.js
 * @Description: 
 */
import request from "@/api/request.js";
import {conventStartEndStamp}  from "@/utils/date.js"

export function getResultClockLog(personalData) {
  console.log(conventStartEndStamp(personalData.currentStamp)[0]);
  return new Promise((resolve) => {
    // http://localhost:9000/result/personalLog?studynth=1&startStamp=1649134584145&endStamp=1749134584145
    request
      .get(`${process.env.VUE_APP_POSITION_PATH}/result/personalLog`, {
        params: {
          studynth: personalData.studynth,
          startStamp: conventStartEndStamp(personalData.currentStamp)[0],
          endStamp: conventStartEndStamp(personalData.currentStamp)[1]
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

export function getResultClockLogCount(personalData) {
  // console.log(conventStartEndStamp(personalData.currentStamp)[0]);
  return new Promise((resolve) => {
    // http://localhost:9000/result/personalLog?studynth=1&startStamp=1649134584145&endStamp=1749134584145
    request
      .get(`${process.env.VUE_APP_POSITION_PATH}/result/personalLogCount`, {
        params: {
          studynth: personalData.studynth
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

export function getResultClockLogItem(personalData) {
  return new Promise((resolve) => {
    request
      .get(`${process.env.VUE_APP_POSITION_PATH}/result/personalLogItem`, {
        params: {
          studynth: personalData.studynth,
          startstamp: personalData.startstamp,
          taskid: personalData.taskid,
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

export function registerStudynthQueryItem(params) {
  return new Promise((resolve) => {
    request
    // http://localhost:9000/user/registerStudynthUpdate?studynth=201824803002&role=%E7%AE%A1%E7%90%86%E5%91%98
      .get(`${process.env.VUE_APP_POSITION_PATH}/user/registerStudynthQueryItem`, {
        params: {
          studynth: params.studynth,
          username: params.username,
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

// http://localhost:9000/result/personalLogCount?studynth=1