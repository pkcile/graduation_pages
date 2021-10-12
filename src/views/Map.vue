<!--
 * @Author: your name
 * @Date: 2021-09-29 09:56:32
 * @LastEditTime: 2021-10-02 09:42:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /page-view/src/views/Map.vue
-->

<template>
  <div id="viewDiv"></div>
</template>
<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView"
import SceneView from "@arcgis/core/views/SceneView";
import esriConfig from "@arcgis/core/config";

import "@/assets/css/mapEsri.css"; // import "@arcgis/core/assets/esri/themes/dark/main.css";

export default {
  name: "test001",
  methods: {
    init() {
      esriConfig.apiKey =
        "AAPK9f8ffc86d8b94d76970cc3e66114c088IE_II48hxUZk64y07bZp1q4SlfifjhZ1c2qit_pI76j4nLKUYnOvz4ABf999H4D6s";
      const map = new Map({
        basemap: "hybrid", //Basemap layer service
        ground: "world-elevation" //Elevation service
      });

      // const view = new MapView({
      //   container: "viewDiv",
      //   map: map
      // });

      const view = new SceneView({
        container: "viewDiv",
        map: map,
        // camera: {
        //   position: {
        //     x: -118.808, //Longitude
        //     y: 33.961, //Latitude
        //     z: 50000 //Meters
        //   },
        //   // tilt: 75
        // }
      })
    }
  },
  mounted() {
    this.init()
  }
};
</script>
<style scoped>
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
