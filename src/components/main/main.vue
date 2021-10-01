<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-10-01 20:25:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /江西师大学生位置签到管理系统/graduation-project/page-view/src/components/main/main.vue
-->

<template>
  <div id="main">
    <!-- 表单 -->
    <ul class="mine-form-display" style="">
      <li>
        <span >坐标定位</span>
        <span >定位精度</span>
      </li>
      <li>
        <span >坐标定位</span>
        <span >定位精度</span>
      </li>
      <li>
        <span >坐标定位</span>
        <span >定位精度</span>
      </li>
      <li style="background: #EFEFF3;"><span>备注</span></li>
      <textarea name="" id="" cols="30" rows="2" placeholder="请详细描述你的问题和意见..."></textarea>
    </ul>
    <!-- 按钮 -->
    <div class="mine-button-block" >获取定位</div>
    <div class="mine-button-block mine-button-red" v-on:click="changeSendPartControl">查看</div>
    <!-- 弹窗 -->
    <div class="send-part" v-bind:class="{ 'send-part-control': sendPart.control}">
      <div class="send-title">
        标题
        <div class="send-control" v-on:click="changeSendPartControl"></div>
      </div>
      <div class="send-main" id="viewDiv"></div>
      <div class="send-footer">发送</div>
    </div>
  </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView"
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView";
import "@arcgis/core/assets/esri/themes/dark/main.css";

// import containerMap from "./layer/containerMap.vue"

export default {
  name: "test001",
  data() {
    return {
      sendPart: {
        control: true
      }
    }
  },
  mounted() {
    this.init();
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
    },
    changeSendPartControl () {
      this.sendPart.control = !this.sendPart.control;
      // alert(666);
    }
  },
  components: {
    // containerMap
  },
  computed: {

  }
};
</script>

<style scoped lang="scss">
#main {
  overflow: hidden;
}
// 弹出组件样式
.send-part {
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
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

.send-part-control {
  display: none;
}

// 表单样式
.mine-form-display {
  background: #fff;
  li {
    display: flex; 
    padding: 11px 15px; 
    height: 50px;
    box-sizing: border-box; 
    flex-direction: row; 
    flex-wrap: nowrap; 
    justify-content: flex-start; 
    align-items: center; 
    border-bottom: 1px solid #EFEFF3;
  }
  li > span:nth-child(1) {
    flex: 0 0 100px;
  }
  li > span:nth-child(2) {
    flex: 2 1 200px;
  }
  textarea {
    border-width: 0;
    width: 100%;
    padding: 10px;
  }
}

// 按钮样式
.mine-button-style {
  display: inline-block;
  line-height: 40px;
  padding: 8px;
  background: #017AFF;
  color: white;
  text-align: center;
  border-radius: 5px;
  width: 100px;
  margin: 5px auto;
}

.mine-button-block {
  display: block;
  line-height: 40px;
  padding: 8px;
  background: #017AFF;
  color: white;
  text-align: center;
  border-radius: 5px;
  width: calc(100% - 25px);
  margin: 8px auto;
}

.mine-button-red {
  background: #DD524D;
}
</style>
