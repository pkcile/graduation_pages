/*
 * @Author: your name
 * @Date: 2021-10-02 11:38:25
 * @LastEditTime: 2021-10-15 15:52:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/map/arcgis/init.js
 */
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


export default function initArcGIS(containerId, defaultConfig) {
  // console.log(containerId);
  // console.log(defaultConfig.initZoomLevel);
  // 配置初始化
  // const containerId = containerId;
  // const initPointXY = defaultConfig.initPointXY;      
  // const initZoomLevel = defaultConfig.initZoomLevel;
  esriConfig.apiKey = "AAPKc84394d2eef545e98c6b4bcfecf1c3f5WEGw0ll-HvjC-Ob6nKqAjSe5EJoBt2XIi19SQJlB-WNfI72VIMQf3xqpOXVER_L2";
  esriConfig.assetsPath = "./assets";

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