<!--
 * @Author: your name
 * @Date: 2021-10-19 10:52:51
 * @LastEditTime: 2021-10-21 20:00:57
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
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        // 1.登陆获取信息
        login: {
          "role": "学生",
          "name": "王朋坤",
          "username": "pkcile",
          "task_radius": "300",
          "task_starttime": "2021-07-09 11:19:00",
          "task_endtime": "2021-07-14 11:19:00",
          "task_placename": "",
          "task_id": "40"
        },
        // 2.用户提交信息
      get: {
          locationItem: "",
          sendDatabase: {
            task_id: 20,
            comment: "评论内容",
            datenow: "2021-10-15 10:12",
            username: "pkcile",
            task_status: 2
          },
        }
      },
      leaflet: {
        map: null,
      }
    }
  },
  mounted() {
    const _this = this;
    // console.log(this.$store.state.Login.get.locationItem.positionPoint);
    const map = L.map("viewDiv", {
      zoomControl: false,
      attributionControl: false
    });
    this.leaflet.map = map;
    
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

    // 位置点、面
    const positionPoint = this?.$store?.state?.Login?.get?.locationItem?.positionPoint;
    const positionBufferPolygon = turf.buffer(positionPoint || turf.point([116.02624654769897, 28.68687471077349]), 0.01, {units: 'kilometers'});
    L.geoJSON(positionBufferPolygon).addTo(map);
    L.geoJSON(positionPoint).addTo(map);
    
    map.setView({
      lat: positionPoint?.geometry?.coordinates[1] || 28.682975759198253, 
      lon: positionPoint?.geometry?.coordinates[0] || 116.026260653, 
    }, 16);

    if(!positionPoint?.geometry?.coordinates[0] || !positionPoint?.geometry?.coordinates[1]) {
      return;
    }

    // 位置判断显示
    if(window.localStorage.getItem("initPositionData")) {
      const initPositionData = JSON.parse(window.localStorage.getItem("initPositionData"));
      const nameFilterResult = initPositionData.data.features.filter((item, index, array) => (item?.properties?.Name === _this?.formData?.login["task_placename"]) || _this?.formData?.login["task_placename"] == "");
      const positionFilterResult = nameFilterResult.filter((item, index, array) => {
        let result = turf.intersect(item, positionBufferPolygon) ? true : false;
        return result;
      });
      window.localStorage.setItem("initPositionData", JSON.stringify(initPositionData));      
      _this.$toast({
        message: '位置判断成功',
        position: 'bottom',
      });
  
      L.geoJSON(positionFilterResult).addTo(map);
    }
    else {
      axios.get("./school-building.geojson").then(function(initPositionData) {
        const nameFilterResult = initPositionData.data.features.filter((item, index, array) => (item?.properties?.Name === _this?.formData?.login["task_placename"]) || _this?.formData?.login["task_placename"] == "");
        const positionFilterResult = nameFilterResult.filter((item, index, array) => {
          let result = turf.intersect(item, positionBufferPolygon) ? true : false;
          return result;
        });
        window.localStorage.setItem("initPositionData", JSON.stringify(initPositionData));      
        _this.$toast({
          message: '位置判断成功',
          position: 'bottom',
        });
    
        L.geoJSON(positionFilterResult).addTo(map);
      });
    }


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
    }
  },
};
</script>


<style lang="scss">

</style>