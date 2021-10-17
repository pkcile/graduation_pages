/*
 * @Author: your name
 * @Date: 2021-10-02 11:38:25
 * @LastEditTime: 2021-10-17 10:56:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/map/arcgis/init.js
 */
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import esriConfig from "@arcgis/core/config";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


export default function initArcGIS(containerId, defaultConfig) {
  // 配置初始化
  esriConfig.apiKey = "AAPKc84394d2eef545e98c6b4bcfecf1c3f5WEGw0ll-HvjC-Ob6nKqAjSe5EJoBt2XIi19SQJlB-WNfI72VIMQf3xqpOXVER_L2";

  // 地图显示
  const map = new Map({
    // basemap: "hybrid",
    basemap: "gray-vector"
  });

  const view = new MapView({
    map: map,
    container: containerId,
    center: defaultConfig.initPointXY,    
    zoom: defaultConfig.initZoomLevel
  });

  return {view, map};
}