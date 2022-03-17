/*
 * @Author: 王朋坤
 * @Date: 2022-03-17 10:16:29
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-17 10:16:30
 * @FilePath: /graduation-project-master/src/utils/distance2.js
 * @Description: 
 */

function haversine() {
  var radians = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
  var lat1 = radians[0], lon1 = radians[1], lat2 = radians[2], lon2 = radians[3];
  // var R = 6372.8; // km
  var R = 6372.8; // km
  var dLat = lat2 - lat1;
  var dLon = lon2 - lon1;
  var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
}

console.log(haversine(28.6843965821, 116.0253033877, 28.6845471765, 116.0284952165), "haversine");
