<!--
 * @Author: your name
 * @Date: 2021-10-19 10:52:51
 * @LastEditTime: 2021-10-19 20:17:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/main/map.vue
-->

<template>
  <!-- 弹窗 -->
  <div class="mine-send-part">
    <div class="send-title">
      位置显示
      <div class="send-control" @click="goToHomeMain"></div>
    </div>
    <div class="send-main" id="viewDiv"></div>
    <div class="send-footer">发送</div>
  </div>
</template>

<script>
export default {
  mounted() {
    const map = L.map("viewDiv").setView(
      [28.682975759198253, 116.026260653],
      16
    );
    L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      // "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        // maxZoom: 18,
        // attribution: 'Mapbox',
        // id: 'mapbox/streets-v11',
        // tileSize: 512,
        // zoomOffset: -1
      }
    ).addTo(map);
  },
  computed: {},
  methods: {
    goToHomeMain() {
      this.$router.push("main");
    },
  },
};
</script>


<style lang="scss">

</style>