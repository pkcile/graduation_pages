/*
 * @Author: 王朋坤
 * @Date: 2022-03-16 21:23:09
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-16 23:20:15
 * @FilePath: /graduation-project-master/src/utils/distance.js
 * @Description:
 */

function getDistance(lat1, lng1, lat2, lng2) {
  var dx = lat1 - lat2; // 经度差值
  var dy = lng1 - lng2; // 纬度差值
  var b = (lng1 + lng2) / 2.0; // 平均纬度
  var Lx = ((dx * Math.PI) / 180.0) * 6367000.0 * Math.cos((b * Math.PI) / 180.0); // 东西距离
  // var Ly = (6367000.0 * dy * Math.PI) / 180.0; // 南北距离
  var Ly = (6367000.0 * dy * Math.PI) / 180.0; // 南北距离
  // 6378.137
  console.log(Math.sqrt(Lx * Lx + Ly * Ly));
}

function rad(d) {
  return d * Math.PI / 180.0; 
}

function getDistance02(lat1, lng1, lat2, lng2) {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里

  var distance = s;
  var distance_str = "";

  if (parseInt(distance) >= 1) {
      distance_str = distance.toFixed(1) + "km";
  } else {
      distance_str = distance * 1000 + "m";
  }

  //s=s.toFixed(4);

  console.info('lyj 距离是', s);
  console.info('lyj 距离是', distance_str);
  return s;
}

// lucene haversine
function getDistance03( lat1,  lon1,  lat2,  lon2) {
  // 纬度
  var wa = rad(lon1)
  var ja = rad(lat1);
  var wb = rad(lon2);
  var jb = rad(lat2);

  var bbbb = 2 * 6367000 * Math.asin(Math.sqrt(Math.sin((wb - wa)/2) * Math.sin((wb - wa)/2)
    + Math.cos(wa)*Math.cos(wb)*Math.sin((ja - jb)/2) * Math.sin((ja - jb)/2)
  ))
  console.log(bbbb);
}

function getDistance04( lat1,  lon1,  lat2,  lon2) {
  // var a = rad(lat1)- rad(lat2);
  // var b = rad(lng1) - rad(lng2);
  var wa = rad(lon1)
  var ja = rad(lat1);
  var wb = rad(lon2);
  var jb = rad(lat2);

  console.log(  6367000 * Math.acos( Math.cos(wa) * Math.cos(wb) * Math.cos(jb - ja) + Math.sin(wa) * Math.sin(wb) )
  );
}

getDistance(116.45, 39.941, 116.451, 39.94);
getDistance02(116.45, 39.941, 116.451, 39.94);
getDistance03(116.45, 39.941, 116.451, 39.94);
// getDistance03(113.273, 23.1172, 115.4268, 22.7733);
getDistance04(116.45, 39.941, 116.451, 39.94);
