/*
 * @Author: your name
 * @Date: 2021-11-12 10:13:37
 * @LastEditTime: 2021-11-12 11:14:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/utils/geolocation.js
 */

// 定义：函数获取位置
function getCurrentLocation(resolve) {
  const geoOption = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    // timeout: 5000
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(data) {
        resolve({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        });
      },
      geoError,
      geoOption
    );
  } 
  else {
  }

  function geoError(resolve) {
    navigator.geolocation.getCurrentPosition(function(data) {
      resolve({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    });
    setTimeout(function() {
      resolve({
        latitude: null,
        longitude: null,
      });
    }, 2000);
  }
}

// 使用获取位置函数
// new Promise(getCurrentLocation).then(function(data) {
//   console.log(data);
// })

export {getCurrentLocation};

