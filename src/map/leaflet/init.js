/*
 * @Author: your name
 * @Date: 2021-11-12 11:17:49
 * @LastEditTime: 2021-11-12 11:44:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/map/leaflet/init.js
 */
import L from "leaflet";

function initLeaflet(containerId, defaultConfig) {
  const map = L.map("sign-map", {
    zoomControl: false
  }).setView(
    [28.682975759198253, 116.026260653],
    16
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "Mapbox",
  }).addTo(map);

  map.zoomControl = false;
  L.control.zoomInText = "a";

  const pointArray = [];
  L.DomEvent.on(map, "click", function (ev) {
    pointArray.push([ev.latlng.lng, ev.latlng.lat]);
    // console.log(JSON.stringify(pointArray));
    // L.DomEvent.stopPropagation(ev);
  });
}

export default initLeaflet;