/*
 * @Author: your name
 * @Date: 2021-11-12 11:17:49
 * @LastEditTime: 2021-11-12 14:10:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/map/leaflet/init.js
 */
import L from "leaflet";

function initLeaflet(containerId, defaultConfig) {
  const position = defaultConfig.position;
  console.log(position);
  const map = L.map(containerId, {
    zoomControl: false
  }).setView(
    [position.latitude, position.longitude],
    18
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "Mapbox",
  }).addTo(map);

  const pointArray = [];
  L.DomEvent.on(map, "click", function (ev) {
    pointArray.push([ev.latlng.lng, ev.latlng.lat]);
    console.log(JSON.stringify(pointArray));
    // L.DomEvent.stopPropagation(ev);
  });

  const greenIcon = L.icon({
    iconUrl:  require('@/assets/img/user/1.jpg'),
    // shadowUrl: require('@/assets/img/user/1.jpg'),
    iconSize:     [22, 22], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });
  L.marker([position.latitude, position.longitude], {icon: greenIcon}).addTo(map);
  // latitude: 28.686717, longitude: 116.02632
  
}

export default initLeaflet;