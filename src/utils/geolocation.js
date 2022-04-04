/*
 * @Author: your name
 * @Date: 2021-11-12 10:13:37
 * @LastEditTime: 2022-04-04 12:39:25
 * @LastEditors: 王朋坤
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/utils/geolocation.js
 */

// import { resolve } from "core-js/fn/promise";

// import { resolve } from "core-js/fn/promise";
import axios from "axios" 

// 定义：函数获取位置
function getCurrentLocation(resolve) {
  const geoOption = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 5000
  };

  if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(

      function(data) {
        console.log(data);
        resolve({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        });
      },
      geoError,
      geoOption
    );
  } else {
  }

  function geoError(resolve) {
    console.log("error");
    // navigator.geolocation.getCurrentPosition(function(data) {
    //   resolve({
    //     latitude: data.coords.latitude,
    //     longitude: data.coords.longitude,
    //   });
    // });
    // setTimeout(function() {
    //   resolve({
    //     latitude: null,
    //     longitude: null,
    //   });
    // }, 2000);
  }
}

// 使用获取位置函数
// new Promise(getCurrentLocation).then(function(data) {
//   console.log(data);
// })
function getCurrentLocation2() {
  return new Promise((resolve) => {
    const geoOption = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 5000
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(data) {
          resolve({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            accuracy: data.coords.accuracy
          });
        },
        geoError,
        geoOption
      );
    } else {
    }

    function geoError(error) {
      // resolve("error")
      console.log("error");
        // Display error based on the error code.
      const { code } = error;
      switch (code) {
        case GeolocationPositionError.TIMEOUT:
          // Handle timeout.
          console.log("timeout");
          break;
        case GeolocationPositionError.PERMISSION_DENIED:
          console.log("denied");
          // User denied the request.
          break;
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          // Position not available.
          console.log("not available");
          break;
      }
    }
  });
}

function getLocationInformation(geometry) {
  return new Promise((resolve) => {
    // 'https://api.tianditu.gov.cn/geocoder?type=geocode&postStr={"lon":113.383507,"lat":23.132059,"ver":1}&tk=75f0434f240669f4a2df6359275146d2'
    axios
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
      });
  });
}

export { getCurrentLocation , getCurrentLocation2, getLocationInformation};
