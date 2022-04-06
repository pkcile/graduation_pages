<!--
 * @Author: 王朋坤
 * @Date: 2022-04-06 11:53:36
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-06 12:13:44
 * @FilePath: /graduation-project-master/src/pages/index/mapview.vue
 * @Description: 
-->
<template>
  <div class="mine-send-part">
    <div class="send-title" style="top:0">
      位置显示
      <div class="send-control"  :style="{'background-image': `url(${require('@/assets/font/close.svg')})`}"></div>
    </div>
    <div class="send-main" id="viewDiv"></div>
    <div
      class="send-footer"
      v-bind:class="{ sendStatus: leaflet.send }"
    >
      发送
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as turf from "@turf/turf";
import L from "leaflet";
// import "leaflet/dist/leaflet.css"
// 想法实时的计算个人与其他同学的距离
export default {
  data() {
    return {
      leaflet: {
        map: null,
        send: false,
      },
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.sendStatus {
  background: rgba(0, 0, 255, 0.527);
  color: white;
}
</style>