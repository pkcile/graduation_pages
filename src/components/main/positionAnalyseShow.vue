<!--
 * @Author: your name
 * @Date: 2021-10-19 10:52:51
 * @LastEditTime: 2022-02-28 21:06:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/main/map.vue
-->

<template>
  <div class="mine-send-part">
    <div class="send-title">
      位置显示
      <div class="send-control" @click="goToHomeMain" :style="{'background-image': `url(${require('@/assets/font/close.svg')})`}"></div>
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

    // 0.提前判断是否获取数据成功
    if (!(task_radius && task_starttime && task_endtime && positionPoint)) {
      _this.$toast("无打卡任务无需判断");
      showMap();
      return;
    }
    // 1.位置分析
    new Promise(analysePosition)
      // 2.时间判断
      .then(function (data) {
        return new Promise(function (resolve) {
          // console.log(task_starttime);
          // console.log(task_endtime);
          //  -2 -1 0 1 2
          const dateNow = Date.now();
          const dateMin = Date.parse(`${task_starttime}`); // 修改Date.parse方法
          const dateMax = Date.parse(`${task_endtime}`);
          // console.log(dateNow, dateMin, dateMax);
          // 未打卡标识
          let dateMark = 0;
          // 位置标识
          let positionMark = data?.positionFilterResult?.length;

          if (dateNow < dateMin) {
            // 提前标识
            dateMark = 2;
          } else if (dateNow >= dateMax && dateNow >= dateMin) {
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
                _this.$notify({
                  message: "迟到了",
                  type: "danger"
                });
                break;
              case 0:
                _this.$notify({
                  message: "未打卡？？",
                  type: "danger"
                });
                break;
              case 1:
                _this.$notify({
                  message: "定位分析成功",
                  type: "success"
                });
                break;
              case 2:
                _this.$notify({
                  message: "来早了",
                  type: "danger"
                });
                break;
            }
          } 
          else {
            dateMark = -2;
            _this.$notify({
              message: "位置偏离",
              type: "warning"
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
          // console.log(_this.$store.state.User.get.sendDatabase);
          resolve(data);
        });
      })
      // 3.结果展示
      .then(showMap);

    // 位置分析
    function analysePosition(resolve) {
      // console.log("位置分析001");
      // console.log(positionPoint);
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
      L.tileLayer(
          "http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=11c1c39e8539023ec9a601dfc23ccad8",
          {
              subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
              attribution: "tianDitu",
          }
      ).addTo(map);

      map.setView(
        {
          lat: positionPoint?.geometry?.coordinates[1] || 28.682975759198253,
          lon: positionPoint?.geometry?.coordinates[0] || 116.026260653,
        },
        18
      );
      if (
        data?.positionBufferPolygon &&
        data?.positionFilterResult &&
        positionPoint
      ) {
        // L.geoJSON(JSON.parse(window.localStorage.getItem("initPositionData"))).addTo(_this.leaflet.map);
        L.geoJSON(data.positionBufferPolygon, {
          style: {
            // "color": "#D55154",
            color: "#00f",
            weight: 5,
            opacity: 0.5,
            fillColor: "#fff",
          },
        }).addTo(_this.leaflet.map);
        L.geoJSON(data.positionFilterResult, {
          style: {
            color: "#f00",
            weight: 3,
            opacity: 1,
            fillColor: "#fff",
          },
        }).addTo(_this.leaflet.map);

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
            layer.bindPopup("定位获取的位置").openPopup();
          },
        }).addTo(map);
      }
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

      // console.log(sendDatabase);
      // 数据发送
      axios
        .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/submit`, {
          params: sendDatabase,
        })
        .catch(
          function() {
          _this.$toast({
              message: "网络出现了点问题",
              position: "bottom",
            });
          }
        )
        .then(function (returnData) {
          // console.log(returnData.data.status);
          if (returnData.data.status === "ok") {
            _this.$toast({
              message: "打卡结果提交成功",
              position: "bottom",
            });
            //  console.log("提交成功");
          } else if (returnData.data.status === "false") {
            _this.$toast({
              message: "请重新获取定位后再提交",
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