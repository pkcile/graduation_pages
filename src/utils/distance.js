/*
 * @Author: 王朋坤
 * @Date: 2022-03-16 21:23:09
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-17 10:51:57
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

// function haversineGreatCircleDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000){
//   // convert from degrees to radians
//   $latFrom = deg2rad($latitudeFrom);
//   $lonFrom = deg2rad($longitudeFrom);
//   $latTo = deg2rad($latitudeTo);
//   $lonTo = deg2rad($longitudeTo);

//   $latDelta = $latTo - $latFrom;
//   $lonDelta = $lonTo - $lonFrom;

//   $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
//       cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
//   return $angle * $earthRadius;
// }
// 6371000 * 2 * ASIN( SQRT( POW( SIN((lat1*PI()/180-lat2*PI()/180)/2), 2) + COS(lat1*PI()/180) * COS(lat2*PI()/180) * POW( SIN((lng1*PI()/180 - lng2*PI()/180)/2), 2) ) )

// lucene haversine 采用半正矢公式（haversine formula）：
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

function getDistance05( lat1,  lon1,  lat2,  lon2) {
  // var a = rad(lat1)- rad(lat2);
  // var b = rad(lng1) - rad(lng2);
  var wa = rad(lon1)
  var ja = rad(lat1);
  var wb = rad(lon2);
  var jb = rad(lat2);

  console.log(6378137 * Math.acos( Math.cos(wa) * Math.cos(wb) * Math.cos(jb - ja) + Math.sin(wa) * Math.sin(wb) )
  );
}

/**
 * Calculates the great-circle distance between two points, with
 * the Vincenty formula.
 * @param float $latitudeFrom Latitude of start point in [deg decimal]
 * @param float $longitudeFrom Longitude of start point in [deg decimal]
 * @param float $latitudeTo Latitude of target point in [deg decimal]
 * @param float $longitudeTo Longitude of target point in [deg decimal]
 * @param float $earthRadius Mean earth radius in [m]
 * @return float Distance between points in [m] (same as earthRadius)
 */
function vincentyGreatCircleDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000){
  // convert from degrees to radians
  $latFrom = deg2rad($latitudeFrom);
  $lonFrom = deg2rad($longitudeFrom);
  $latTo = deg2rad($latitudeTo);
  $lonTo = deg2rad($longitudeTo);

  $lonDelta = $lonTo - $lonFrom;
  $a = pow(cos($latTo) * sin($lonDelta), 2) +
      pow(cos($latFrom) * sin($latTo) - sin($latFrom) * cos($latTo) * cos($lonDelta), 2);
  $b = sin($latFrom) * sin($latTo) + cos($latFrom) * cos($latTo) * cos($lonDelta);

  $angle = atan2(sqrt($a), $b);
  return $angle * $earthRadius;
}

// var Earth = Util.extend({}, CRS, {
// 	wrapLng: [-180, 180],

// 	// Mean Earth Radius, as recommended for use by
// 	// the International Union of Geodesy and Geophysics,
// 	// see https://rosettacode.org/wiki/Haversine_formula
// 	R: 6371000,

// 	// distance between two geographical points using spherical law of cosines approximation
// 	distance: function (latlng1, latlng2) {
// 		var rad = Math.PI / 180,
// 		    lat1 = latlng1.lat * rad,
// 		    lat2 = latlng2.lat * rad,
// 		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
// 		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
// 		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
// 		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// 		return this.R * c;
// 	}
// });

function getDistance06() {}


((x, y) => {
  'use strict';

  // haversine :: (Num, Num) -> (Num, Num) -> Num
  const haversine = ([lat1, lon1], [lat2, lon2]) => {
      // Math lib function names
      const [pi, asin, sin, cos, sqrt, pow, round] = [
          'PI', 'asin', 'sin', 'cos', 'sqrt', 'pow', 'round'
      ]
      .map(k => Math[k]),

          // degrees as radians
          [rlat1, rlat2, rlon1, rlon2] = [lat1, lat2, lon1, lon2]
          .map(x => x / 180 * pi),

          dLat = rlat2 - rlat1,
          dLon = rlon2 - rlon1,
          radius = 6372.8; // km

      // km
      return round(
          radius * 2 * asin(
              sqrt(
                  pow(sin(dLat / 2), 2) +
                  pow(sin(dLon / 2), 2) *
                  cos(rlat1) * cos(rlat2)
              )
          ) * 100
      ) / 100;
  };

  // TEST
  return haversine(x, y);

  // --> 2887.26

})([28.6843965821, 116.0253033877], [28.6845471765, 116.0284952165]);


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
// This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
getDistance(116.45, 39.941, 116.451, 39.94);
getDistance02(116.45, 39.941, 116.451, 39.94);
getDistance03(116.45, 39.941, 116.451, 39.94);
// getDistance03(113.273, 23.1172, 115.4268, 22.7733);
getDistance04(116.45, 39.941, 116.451, 39.94);
getDistance05(116.0253033877, 28.6843965821, 116.0284952165, 28.6845471765);
getDistance05(116.0253033877, 28.6843965821, 116.0284952165, 28.6845471765);
// getDistance02(116.0253033877, 28.6843965821, 116.0284952165, 28.6845471765);

function toRad(n) {
  return n * Math.PI / 180;
 };
 function distVincenty(lat1, lon1, lat2, lon2) {
  var a = 6378137,
      b = 6356752.3142,
      f = 1 / 298.257223563, // WGS-84 ellipsoid params
      L = toRad(lon2-lon1),
      U1 = Math.atan((1 - f) * Math.tan(toRad(lat1))),
      U2 = Math.atan((1 - f) * Math.tan(toRad(lat2))),
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

 console.log(
  distVincenty(28.6843965821, 116.0253033877, 28.6845471765, 116.0284952165))

