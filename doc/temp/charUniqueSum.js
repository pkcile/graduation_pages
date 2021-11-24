/*
 * @Author: your name
 * @Date: 2021-11-24 20:53:40
 * @LastEditTime: 2021-11-24 21:00:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/doc/temp/unique.js
 */

// 牛客选择题，字符串统计的对象解法

function stringSum(str) {
  var obj = {};
  for (var i = 0; i < str.length; i++) {
    var key = str[i];
    if (!obj[key]) {
      obj[key] = 1;
    } else {
      obj[key]++;
    }
  }
  var max = -1;
  var max_key = "";
  var key;
  for (key in obj) {
    if (max < obj[key]) {
      max = obj[key];
      max_key = key;
    }
  }
  return obj;
}

console.log(stringSum("stiabsstringapbs"));
