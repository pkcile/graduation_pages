<!--
 * @Author: your name
 * @Date: 2021-10-19 10:52:51
 * @LastEditTime: 2021-10-27 14:12:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/main/map.vue
-->

<template>
  <div class="mine-send-part">
    <div class="send-title">
      位置显示
      <div class="send-control" @click="goToHomeMain"></div>
    </div>
    <div class="send-main" id="viewDiv"></div>
    <div
      class="send-footer"
      @click="getSendData"
      v-bind:class="{ sendStatus: leaflet.send }"
    >
      发送
    </div>
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
        send: false,
      },
    };
  },
  mounted() {
    // turf：点、距离、属性条件设置
    const {
      task_placename,
      task_radius,
      task_starttime,
      task_endtime,
      positionPoint,
      _this,
    } = {
      task_placename: this?.$store?.state?.User?.login?.task_placename,
      task_radius: this?.$store?.state?.User?.login?.task_radius,
      task_starttime: this?.$store?.state?.User?.login?.task_starttime,
      task_endtime: this?.$store?.state?.User?.login?.task_endtime,
      positionPoint: this?.$store?.getters["User/positionPointGeoJSON"](),
      _this: this,
    };

    // 1.位置分析
    new Promise(analysePosition)
      // 2.时间判断
      .then(function (data) {
        return new Promise(function (resolve) {
          //  -2 -1 0 1 2
          const dateNow = Date.now();
          const dateMin = Date.parse(`${task_starttime}`); // 修改Date.parse方法
          const dateMax = Date.parse(`${task_endtime}`);
          // 未打卡标识
          let dateMark = 0;
          // 位置标识
          let positionMark = data?.positionFilterResult?.length;

          if (dateNow < dateMin) {
            // 提前标识
            dateMark = 2;
          } else if (dateNow > dateMax) {
            // 迟到标识
            dateMark = -1;
          } else if (dateNow >= dateMin && dateNow <= dateMax) {
            // 正常标识
            dateMark = 1;
          }

          // 提示
          if (positionMark) {
            switch (dateMark) {
              case -1:
                _this.$toast({
                  message: "迟到了",
                  position: "bottom",
                });
                break;
              case 0:
                _this.$toast({
                  message: "未",
                  position: "bottom",
                });
                break;
              case 1:
                _this.$toast({
                  message: "定位成功",
                  position: "bottom",
                });
                break;
              case 2:
                _this.$toast({
                  message: "来早了",
                  position: "bottom",
                });
                break;
            }
          } else {
            dateMax = -2;
            _this.$toast({
              message: "位置偏离",
              position: "bottom",
            });
          }

          // 更新
          const date = new Date();
          const datenow =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            (date.getMinutes() + 1) +
            ":" +
            (date.getSeconds() + 1);
          _this.$store.state.User.get.sendDatabase.datenow = datenow;
          _this.$store.state.User.get.sendDatabase.task_status = dateMark;
          console.log(_this.$store.state.User.get.sendDatabase);
          resolve(data);
        });
      })
      // 3.结果展示
      .then(showMap);

    // 位置分析
    function analysePosition(resolve) {
      const positionBufferPolygon = turf.buffer(
        positionPoint,
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
            const nameFilterResult = initPositionData.features.filter(
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
        const nameFilterResult = initPositionData.features.filter(
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
    // 时间判断
    function analyseTime(resolve) {}
    // 结果显示
    function showMap(data) {
      // 地图显示
      const map = L.map("viewDiv", {
        zoomControl: true,
        attributionControl: true,
      });
      _this.leaflet.map = map; // 存在this指向的问题
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "Mapbox",
      }).addTo(map);
      map.setView(
        {
          lat: positionPoint?.geometry?.coordinates[1] || 28.682975759198253,
          lon: positionPoint?.geometry?.coordinates[0] || 116.026260653,
        },
        18
      );

      L.geoJSON(data.positionBufferPolygon).addTo(_this.leaflet.map);
      L.geoJSON(data.positionFilterResult).addTo(_this.leaflet.map);

      L.geoJSON(positionPoint, {
        pointToLayer: function (feature, latlng) {
          const geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          };
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
          console.log(layer);
          layer.bindPopup("定位获取的位置").openPopup();
        },
      }).addTo(map);
    }
  },
  computed: {},
  methods: {
    goToHomeMain() {
      this.$router.push("main");
    },
    getSendData() {
      const { positionPoint, _this, map, sendDatabase } = {
        positionPoint:
          this?.$store?.state?.User?.get?.locationItem?.positionPoint,
        _this: this,
        map: this.leaflet.map,
        sendDatabase: this?.$store?.state?.User?.get?.sendDatabase,
      };

      map.setView(
        L.latLng(positionPoint.latitude, positionPoint.longitude),
        17,
        {
          duration: 2,
        }
      );

      console.log(sendDatabase);
      // 数据发送
      axios
        .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/submit`, {
          params: sendDatabase,
        })
        .then(function (returnData) {
          console.log(returnData.data.status);
          if (returnData.data.status === "ok") {
            _this.$toast({
              message: "提交成功",
              position: "bottom",
            });
            //  console.log("提交成功");
          } else if (returnData.data.status === "false") {
            _this.$toast({
              message: "提交失败",
              position: "bottom",
            });
          }
          _this.leaflet.send = true;
        });
    },
  },
};
</script>


<style lang="scss">
.sendStatus {
  background: rgba(0, 0, 255, 0.527);
  color: white;
}
</style>