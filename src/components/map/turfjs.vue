
<!--
 * @Author: your name
 * @Date: 2021-10-17 23:19:36
 * @LastEditTime: 2021-10-18 17:56:07
 * @LastEditors: Please set LastEditors
 e set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/map/turfjs.vue
-->

<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
    };
  },
  mounted() {
    this.initDate();
  },
  methods: {
    initDate() {
      const map = L.map("map").setView([28.682975759198253, 116.026260653], 16);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
          maxZoom: 18,
          attribution: "Mapbox",
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(map);

      L.DomEvent.on(map, "click", function (ev) {
        // console.log(ev);
        // L.DomEvent.stopPropagation(ev);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: calc(100vh);
  z-index: 1;
}
</style>
