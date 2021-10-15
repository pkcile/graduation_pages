/*
 * @Author: your name
 * @Date: 2021-10-11 12:00:43
 * @LastEditTime: 2021-10-15 17:01:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/map/arcgis/GeolocationShow.js
 */
import Graphic from "@arcgis/core/Graphic";

function GeolocationShow(view) {
  return new Promise(function(resolve) {
    navigator.geolocation.getCurrentPosition(function(data) {
      console.log(data);
      // 定义点位geojson格式
      const locationItem = {
        type: "Feature",
        properties: {
          title: "浏览器定位信息",
          collect_time: "2021-06-02 15:47",
          place_name: null,
          location_accuracy: null,
          location_timestamp: null,
          location_altitude: null,
          location_type: 2,
          location_name: "浏览器定位",
          location_status: null,
          location_infor: null,
          location_isConverted: false,
          mark_style: 2,
        },
        geometry: {
          type: "Point",
          coordinates: [116.317967, 35.116952],
        },
      };
      locationItem.properties.collect_time = toolDateGet();
      locationItem.properties.location_accuracy = data.coords.accuracy;
      locationItem.properties.location_timestamp = data.timestamp;
      locationItem.properties.location_altitude = data.coords.altitude;
      locationItem.geometry.coordinates[0] = data?.coords?.longitude
        ? data.coords.longitude
        : 0;
      locationItem.geometry.coordinates[1] = data?.coords?.latitude
        ? data.coords.latitude
        : 0;
  
      console.log(view);
  
      // 持久化存储点位
      // 定位成功提示
      // 坐标采集时间
      const pointGraphic = new Graphic({
        geometry: {
          type: "point",
          longitude: locationItem.geometry.coordinates[0],
          latitude: locationItem.geometry.coordinates[1],
        },
        symbol: {
          type: "simple-marker",
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
        },
      });
      console.log(view);
      view.graphics.addMany([pointGraphic]);
      view.goTo(
        {
          target: pointGraphic,
          zoom: 16,
        },
        {
          duration: 1000,
        }
      );
      resolve(locationItem);
    });
  })
}

// 获取时间
function toolDateGet() {
  const date_tool = new Date();
  return (
    date_tool.getFullYear() +
    "-" +
    (date_tool.getMonth() + 1) +
    "-" +
    date_tool.getDate() +
    " " +
    date_tool.getHours() +
    ":" +
    date_tool.getMinutes()
  );
}

export default GeolocationShow;
