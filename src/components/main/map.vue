<!--
 * @Author: your name
 * @Date: 2021-10-19 10:52:51
 * @LastEditTime: 2021-10-23 20:46:29
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
    <div class="send-footer" @click="moveMap">发送</div>
  </div>
</template>

<script>
import * as axios from "axios";
import * as turf from "@turf/turf"
import * as L from "leaflet"

export default {
  data() {
    return {
      leaflet: {
        map: null,
      },
    };
  },
  mounted() {
    console.log(L);
    console.log(turf);
    console.log(axios);

    // console.log(point([116.02624654769897, 28.68687471077349]));
    // console.log(buffer(point([116.02624654769897, 28.68687471077349]), 0.01));
    // console.log(intersect(buffer(point([116.02624654769897, 28.68687471077349]), 0.01), buffer(point([116.02624654769897, 28.68687471077349]), 0.01)));
    // const { task_placename, positionPoint, _this } = {
    //   _this: this,
    //   task_placename: this?.$store?.state?.Login?.login["task_placename"],
    //   positionPoint:
    //     this?.$store?.state?.Login?.get?.locationItem?.positionPoint,
    // };

    // // turf：点、距离、属性条件设置

    // const positionBufferPolygon = turf.buffer(
    //   positionPoint || turf.point([116.02624654769897, 28.68687471077349]),
    //   0.01,
    //   { units: "kilometers" }
    // );

    // // 地图显示
    // const map = L.map("viewDiv", {
    //   zoomControl: true,
    //   attributionControl: true
    // });
    // this.leaflet.map = map;
    // L.tileLayer(
    //   "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    //   {
    //     maxZoom: 19,
    //     attribution: 'Mapbox'
    //   }
    // ).addTo(map);
    // map.setView({
    //   lat: positionPoint?.geometry?.coordinates[1] || 28.682975759198253,
    //   lon: positionPoint?.geometry?.coordinates[0] || 116.026260653,
    // }, 16);
    // L.geoJSON(positionBufferPolygon).addTo(map);
    // L.geoJSON(positionPoint).addTo(map);

    // if (
    //   !positionPoint?.geometry?.coordinates[0] ||
    //   !positionPoint?.geometry?.coordinates[1]
    // ) {
    //   return;
    // }

    // // 位置判断显示
    // if (window.localStorage.getItem("initPositionData")) {
    //   const initPositionData = JSON.parse(
    //     window.localStorage.getItem("initPositionData")
    //   );
    //   const nameFilterResult = initPositionData.data.features.filter(
    //     (item, index, array) =>
    //       item?.properties?.Name === task_placename || task_placename == ""
    //   );
    //   const positionFilterResult = nameFilterResult.filter(
    //     (item, index, array) => {
    //       let result = turf.intersect(item, positionBufferPolygon)
    //         ? true
    //         : false;
    //       return result;
    //     }
    //   );
    //   window.localStorage.setItem(
    //     "initPositionData",
    //     JSON.stringify(initPositionData)
    //   );
    // } 
    // else {
    //   axios.get("./school-building.geojson").then(function (initPositionData) {
    //     const nameFilterResult = initPositionData.data.features.filter(
    //       (item, index, array) =>
    //         item?.properties?.Name === task_placename || task_placename == ""
    //     );
    //     const positionFilterResult = nameFilterResult.filter(
    //       (item, index, array) => {
    //         let result = turf.intersect(item, positionBufferPolygon)
    //           ? true
    //           : false;
    //         return result;
    //       }
    //     );
    //     window.localStorage.setItem(
    //       "initPositionData",
    //       JSON.stringify(initPositionData)
    //     );
    //   });
    // }

    // _this.$toast({
    //   message: "位置判断成功",
    //   position: "bottom",
    // });

    // L.geoJSON(positionFilterResult).addTo(map);
    // 时间判断、位置判断

    // 内容提交
  },
  computed: {},
  methods: {
    goToHomeMain() {
      this.$router.push("main");
    },
    moveMap() {
      const map = this.leaflet.map;
      console.log(map);
      map.setView(L.latLng(28.682975759198253, 116.026260653), 18, {
        duration: 2,
        // easeLinearity: 1
      });
    },
  },
};
</script>


<style lang="scss">
</style>