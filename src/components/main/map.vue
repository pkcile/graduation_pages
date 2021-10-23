<!--
 * @Author: your name
 * @Date: 2021-10-19 10:52:51
 * @LastEditTime: 2021-10-23 23:56:43
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
import * as turf from "@turf/turf";
import * as L from "leaflet";

export default {
  data() {
    return {
      leaflet: {
        map: null,
      },
    };
  },
  mounted() {
    // console.log(L);
    // console.log(turf);
    // console.log(axios);
    // console.log(this?.$store?.state?.Login?.login?.task_radius);
    // turf：点、距离、属性条件设置
    const { task_placename, task_radius, positionPoint } = {
      task_placename: this?.$store?.state?.Login?.login?.task_placename,
      task_radius: this?.$store?.state?.Login?.login?.task_radius,
      positionPoint:
        this?.$store?.state?.Login?.get?.locationItem?.positionPoint,
    };

    function analysePosition(resolve) {
      const positionBufferPolygon = turf.buffer(
        turf.point([positionPoint.longitude, positionPoint.latitude]),
        task_radius * 1e-3,
        { units: "kilometers" }
      );

      if (!window.localStorage.getItem("initPositionData")) {
        axios
          .get("./school-building.geojson")
          .then(function (initPosition) {
            window.localStorage.setItem(
              "initPositionData",
              JSON.stringify(initPosition?.data)
            );
          })
          .then(function () {
            const initPositionData = JSON.parse(
              window.localStorage.getItem("initPositionData")
            );
            const nameFilterResult = initPositionData.data.features.filter(
              (item, index, array) =>
                item?.properties?.Name === task_placename ||
                task_placename == ""
            );
            const positionFilterResult = nameFilterResult.filter(
              (item, index, array) => {
                let result = turf.intersect(item, positionBufferPolygon)
                  ? true
                  : false;
                return result;
              }
            );
            resolve({ positionBufferPolygon, positionFilterResult });
          });
      } else {
        const initPositionData = JSON.parse(
          window.localStorage.getItem("initPositionData")
        );
        const nameFilterResult = initPositionData.data.features.filter(
          (item, index, array) =>
            item?.properties?.Name === task_placename || task_placename == ""
        );
        const positionFilterResult = nameFilterResult.filter(
          (item, index, array) => {
            let result = turf.intersect(item, positionBufferPolygon)
              ? true
              : false;
            return result;
          }
        );
        resolve({ positionBufferPolygon, positionFilterResult });
      }
    }

    new Promise(analysePosition).then(function(data) {
      console.log(data);
    })


    // 地图显示
    const map = L.map("viewDiv", {
      zoomControl: true,
      attributionControl: true
    });
    this.leaflet.map = map;
    L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution: 'Mapbox'
      }
    ).addTo(map);
    map.setView({
      lat: positionPoint?.geometry?.coordinates[1] || 28.682975759198253,
      lon: positionPoint?.geometry?.coordinates[0] || 116.026260653,
    }, 16);
    // L.geoJSON(positionBufferPolygon).addTo(map);
    // L.geoJSON(positionPoint).addTo(map);

    // if (
    //   !positionPoint?.geometry?.coordinates[0] ||
    //   !positionPoint?.geometry?.coordinates[1]
    // ) {
    //   return;
    // }

    // _this.$toast({
    //   message: "位置判断成功",
    //   position: "bottom",
    // });

    // L.geoJSON(positionFilterResult).addTo(map);
    // 时间判断、位置判断
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