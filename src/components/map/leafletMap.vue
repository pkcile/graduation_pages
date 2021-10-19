
<!--
 * @Author: your name
 * @Date: 2021-10-17 23:19:36
 * @LastEditTime: 2021-10-19 21:15:41
 * @LastEditors: Please set LastEditors
 e set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/map/turfjs.vue
-->

<template>
  <div id="mapLeaflet">
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
    console.log(L);
  },
  methods: {
    initDate() {
      const map = L.map("mapLeaflet").setView([28.682975759198253, 116.026260653], 16);
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

      const pointArray = [];
      L.DomEvent.on(map, "click", function (ev) {
        
        pointArray.push([ev.latlng.lng, ev.latlng.lat]);
        console.log(JSON.stringify(pointArray));
        // L.DomEvent.stopPropagation(ev);
      });
      console.log(L);
    },
  },
};
</script>

<style lang="scss" scoped>
#mapLeaflet {
  width: 100%;
  height: 100%;
}
</style>
