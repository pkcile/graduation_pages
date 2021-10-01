<!--
 * @Author: your name
 * @Date: 2021-09-29 08:45:50
 * @LastEditTime: 2021-10-01 19:34:25
 * @LastEditors: Please set LastEditors
 * @Description: import lib like dojo，存在一点问题展示不了Map
 * @FilePath: /page-view/src/components/main/map.vue
-->
<template>
  <div id="viewDiv"></div>
</template>

<script>
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import esriConfig from "@arcgis/core/config";


import { loadModules } from "esri-loader";
// import "@arcgis/core/assets/esri/themes/dark/main.css";
import "@/assets/css/mapEsri.css";

export default {
  name: "maptest2",
  methods: {
    init() {
      // esriConfig.assetsPath = "./assets";
      // esriConfig.apiKey =
      //   "AAPK9f8ffc86d8b94d76970cc3e66114c088IE_II48hxUZk64y07bZp1q4SlfifjhZ1c2qit_pI76j4nLKUYnOvz4ABf999H4D6s";

      // const map = new Map({
      //   basemap: "hybrid",
      // });

      // const view = new MapView({
      //   container: "viewDiv",
      //   map: map,
      // });

      loadModules(["esri/WebMap", "esri/views/MapView"])
        .then(([WebMap, MapView]) => {
          var webmap = new WebMap({
            portalItem: {
              id: "f2e9b762544945f390ca4ac3671cfa72",
            },
          });
          var view = new MapView({
            map: webmap,
            container: "viewDiv",
          });
        })
        .catch((err) => {
        console.error(err);
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
#viewDiv {
  width: 100%;
  height: 100%;
  // background: #bfa;
}
</style>