<!--
 * @Author: your name
 * @Date: 2021-09-29 10:36:34
 * @LastEditTime: 2021-10-01 19:34:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /page-view/src/components/main/maptest.vue
-->

<template>
  <div id="viewDiv"></div>
</template>
<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView"
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView";

import "@/assets/css/mapEsri.css";
export default {
  name: "test001",
  methods: {
    init() {
      // esriConfig.assetsPath = "./assets";
      esriConfig.apiKey =
        "AAPK9f8ffc86d8b94d76970cc3e66114c088IE_II48hxUZk64y07bZp1q4SlfifjhZ1c2qit_pI76j4nLKUYnOvz4ABf999H4D6s";

      const map = new Map({
        basemap: "hybrid",
      });

      const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [116.02977984012539, 28.680380674844685],
		    zoom: 15
      });
    },
    init2() {
      esriConfig.apiKey =
        "AAPK9f8ffc86d8b94d76970cc3e66114c088IE_II48hxUZk64y07bZp1q4SlfifjhZ1c2qit_pI76j4nLKUYnOvz4ABf999H4D6s";
      const map = new Map({
        basemap: "arcgis-topographic", //Basemap layer service
        ground: "world-elevation" //Elevation service
      })
 
      const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
          position: {
            x: -118.808, //Longitude
            y: 33.961, //Latitude
            z: 2000 //Meters
          },
          tilt: 75
        }
      })
    }
  },
  mounted() {
    this.init();
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
