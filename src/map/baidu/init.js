/*
 * @Author: your name
 * @Date: 2021-12-12 14:05:30
 * @LastEditTime: 2021-12-12 15:41:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \graduation-project\src\map\baidu\init.js
 */

export default function loadBMap(ak) {
    return new Promise(function(resolve, reject) {
      if (typeof BMapGL !== 'undefined') {
        resolve(BMapGL);
        return true;
      }
      window.init = function() {
        resolve(BMapGL);
      }
      let script = document.createElement('script');
      let protocolJudge = window.location.protocol;
      console.log(protocolJudge);
      script.type = 'text/javascript';
      script.src =
        protocolJudge + '//api.map.baidu.com/api?type=webgl&v=1.0&ak=' + ak + '&callback=init';
      script.onerror = reject;
      document.head.appendChild(script);
    })
  }
