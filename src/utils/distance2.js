/*
 * @Author: 王朋坤
 * @Date: 2022-03-17 10:16:29
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-17 17:00:36
 * @FilePath: /graduation-project-master/src/utils/distance2.js
 * @Description: 
 */


/*

参考资料

### 由维基百科可以看到，求取地理距离，有以下三种大类的方式：

#### 1.平面公式

- 极坐标平坦地球公式（flat-Earth formul）
- 投射到平面的球形地球
- 投影到平面的椭球体地球


#### 2.球面公式
- 球面三角学公式（spherical trigonometry ）
- 半正矢公式(haversine formula，改进版)


#### 3.椭圆体曲面公式
- 文森特公式（vincenty formula）


参考，推荐文章：
[1]维基百科，地理距离：https://en.wikipedia.org/wiki/Geographical_distance#Spherical_Earth_projected_to_a_plane
[2]美团技术团队，地理空间距离计算优化，https://tech.meituan.com/2014/09/05/lucene-distance.html
[3]GMT，三种距离计算方式：https://docs.gmt-china.org/5.4/appendix/calculate-distance/#
[4]Kaimbridge，haversine formula公式多种计算机语言实现方式，https://rosettacode.org/wiki/Haversine_formula
*/
function rad(d) {
  return d * Math.PI / 180.0; 
}

/**
 * @description: 极坐标平地公式（Polar coordinate flat-Earth formul）
 * @param {*} point1
 * @param {*} longitude
 * @param {*} point2
 * @param {*} longitude
 * @return {*}
 */
function flatearthDistance( point1 = {latitude ,longitude}, point2 = {latitude ,longitude}) {
  var dx = point1.longitude - point2.longitude; // 经度差值
  var dy = point1.latitude - point2.latitude; // 纬度差值
  var b = (point1.latitude + point2.latitude) / 2.0; // 平均纬度
  var Lx = rad(dx) * 6371000.0 * Math.cos(rad(b)); // 东西距离
  var Ly = 6371000.0 * rad(dy); // 南北距离

  return Math.sqrt(Lx * Lx + Ly * Ly);
}

/**
 * @description: 反余弦公式（acos）
 * @param {*} point1
 * @param {*} longitude
 * @param {*} point2
 * @param {*} longitude
 * @return {*}
 */
function acosDistance(point1 = {latitude ,longitude}, point2 = {latitude ,longitude}) {
  var lat01 = rad(point1.latitude)
  var lon01 = rad(point1.longitude);
  var lat02 = rad(point2.latitude);
  var lon02 = rad(point2.longitude);

  return 6371000 * Math.acos(Math.cos(lat01) * Math.cos(lat02) * Math.cos(lon02 - lon01) + Math.sin(lat01) * Math.sin(lat02));
}

/**
 * @description: 半正矢公式(haversine formula)
 * @param {*} point1
 * @param {*} longitude
 * @param {*} point2
 * @param {*} longitude
 * @return {*}
 */
function haversineDistance(point1 = {latitude ,longitude}, point2 = {latitude ,longitude}) {
  var lat01 = rad(point1.latitude)
  var lon01 = rad(point1.longitude);
  var lat02 = rad(point2.latitude);
  var lon02 = rad(point2.longitude);

  var R = 6371000.0 // m 平均地球半径，https://rosettacode.org/wiki/Haversine_formula
  var dLat = lat02 - lat01;
  var dLon = lon02 - lon01;
  var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat01) * Math.cos(lat02);
  var c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
}

/**
 * @description: 文森特公式（vincenty formula）
 * @param {*} point1
 * @param {*} longitude
 * @param {*} point2
 * @param {*} longitude
 * @return {*}
 */
function vincentyDistance(point1 = {latitude ,longitude}, point2 = {latitude ,longitude}) {
  var a = 6378137,
      b = 6356752.3142,
      f = 1 / 298.257223563, // WGS-84 ellipsoid params
      L = rad(point2.longitude - point1.longitude),
      U1 = Math.atan((1 - f) * Math.tan(rad(point1.latitude))),
      U2 = Math.atan((1 - f) * Math.tan(rad(point2.latitude))),
      sinU1 = Math.sin(U1),
      cosU1 = Math.cos(U1),
      sinU2 = Math.sin(U2),
      cosU2 = Math.cos(U2),
      lambda = L,
      lambdaP,
      iterLimit = 100;
  do {
   var sinLambda = Math.sin(lambda),
       cosLambda = Math.cos(lambda),
       sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
   if (0 === sinSigma) {
    return 0; // co-incident points
   };
   var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda,
       sigma = Math.atan2(sinSigma, cosSigma),
       sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma,
       cosSqAlpha = 1 - sinAlpha * sinAlpha,
       cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha,
       C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
   if (isNaN(cos2SigmaM)) {
    cos2SigmaM = 0; // equatorial line: cosSqAlpha = 0 (§6)
   };
   lambdaP = lambda;
   lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
 
  if (!iterLimit) {
   return NaN; // formula failed to converge
  };
 
  var uSq = cosSqAlpha * (a * a - b * b) / (b * b),
      A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq))),
      B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq))),
      deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM))),
      s = b * A * (sigma - deltaSigma);
  // return s.toFixed(3); // round to 1mm precision
  return s;
};

console.log(flatearthDistance({latitude: 28.6843965821, longitude: 116.0253033877}, {latitude: 28.6845471765, longitude: 116.0284952165}), "flatearthDistance");
console.log(acosDistance({latitude: 28.6843965821, longitude: 116.0253033877}, {latitude: 28.6845471765, longitude: 116.0284952165}), "acosDistance");
console.log(haversineDistance({latitude: 28.6843965821, longitude: 116.0253033877}, {latitude: 28.6845471765, longitude: 116.0284952165}), "haversineDistance");
console.log(vincentyDistance({latitude: 28.6843965821, longitude: 116.0253033877}, {latitude: 28.6845471765, longitude: 116.0284952165}), "vincentyDistance");
