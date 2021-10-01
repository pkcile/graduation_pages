<!--
 * @Author: your name
 * @Date: 2021-09-29 20:54:52
 * @LastEditTime: 2021-09-30 15:13:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /page-view/src/components/main/layer/containerMap.vue
-->

<template>
    <div class="send-part">
      <div class="send-title">
        标题
        <div class="send-control"></div>
      </div>
      <div class="send-main" id="viewDiv"></div>
      <div class="send-footer">发送</div>
    </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView"
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView";
import "@arcgis/core/assets/esri/themes/dark/main.css";
export default {
  name: "test001",
  created() {

  },
  beforeMount() {
    this.init();
  },
  mounted() {
  },
  methods: {
    init() {
      esriConfig.assetsPath = "./assets";
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
  
}
</script>

<style lang="scss" scoped>
// 组件样式
.send-part {
  width: 100%;
  height: 100%;
  position: absolute;
  width: 100%;
  // height: calc(100% - 70px);
  left: 0%;
  top: 0%;
  background: #F1F1F4;
  z-index: 0;
  .send-title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-weight: 500;
    font-size: 17px;
    position: relative;
    .send-control {
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      height: 100%;
      background: #bfa;
    }
  }
  .send-main {
    width: 100%;
    height: calc(100% - 100px);
    // background: #bfa;
  }
  .send-footer {
    width: 100%;
    height: 56px;
    line-height: 56px;
    box-sizing: border-box;
    text-align: center;

  }
}
</style>