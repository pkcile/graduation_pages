<!--
 * @Author: 王朋坤
 * @Date: 2022-03-28 10:26:00
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-10 18:06:08
 * @FilePath: /graduation-project-master/src/pages/publish/map.vue
 * @Description: 
-->

<template>
  <div class="show-map" style="">
    <div class="title">
      <div
        class="control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="leftClose"
      ></div>
      <div class="text">位置拾取</div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
        }"
        @click="rightSure"
      ></div>
    </div>
    <div id="viewDiv" style="position: relative">
      <div
        class="tool-center"
        style="
          position: absolute;
          z-index: 1000;
          width: 40px;
          height: 40px;
          left: calc(50% - 20px);
          top: calc(50% - 20px);
          background-image: url('http://xguaita.github.io/Leaflet.MapCenterCoord/dist/icons/MapCenterCoordIcon1.svg');
        "
      ></div>
      <div
        style="
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30px;
          line-height: 30px;
          background: #f1f1f4a3;
          z-index: 1000;
        "
      >
        经度：{{ Number(longitude).toFixed(5) }} 纬度：{{
          Number(latitude).toFixed(5)
        }}
      </div>
    </div>
    <div id="tool-control">
      <searchview @changeviewmap="changeviewmapFun"></searchview>
      <van-checkbox
        class="layer-item"
        v-model="item.checked"
        icon-size="24px"
        v-for="item in layersControl"
        v-bind:key="item.id"
        @click="checkoutLayer(item)"
        >{{ item.name }}
      </van-checkbox>

      <van-cell
        is-link
        title="打卡范围"
        :value="radius + '米'"
        @click="show = true"
      />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        style=""
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show-map {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  z-index: 2;

  .title {
    height: 50px;
    width: 100%;
  }
  .title {
    // position: relative;
    background: #f1f1f4;
    height: 50px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // width: 100%    text-align: center;
    .control {
      width: 50px;
      height: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .text {
      flex: 1 0 100px;
    }
    .right {
      width: 50px;
      height: 100%;
      right: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
    }
  }
  #viewDiv {
    width: 100%;
    height: calc(100% - 330px);
  }

  #tool-control {
    width: 100%;
    height: 180px;
  }

  .layer-item {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px dotted #ddd;
  }
  .layer-item:last-child {
    border-bottom: 0 solid rgb(212, 18, 18);
    border-bottom: 1px dotted #ddd;
  }
}

.van-popup--bottom.van-popup--round {
  border-radius: 0;
}

.van-cell {
  position: absolute;
  bottom: 0;
}

.leaflet-right {
  right: 0;
  display: none !important;
}
</style>

<script>
import { Checkbox, CheckboxGroup, Cell, CellGroup, ActionSheet } from "vant";
import L from "leaflet";
import { getCurrentLocation2 } from "@/utils/geolocation.js";
import { geometry, point } from "@turf/helpers";
import searchview from "@/components/search.vue";
export default {
  name: "mapapp",
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    searchview: searchview,
  },
  data() {
    return {
      result: [],
      layersControl: [
        {
          id: 1,
          name: "遥感底图",
          checked: false,
          type: "imagery",
        },
        {
          id: 5,
          name: "项目定位",
          checked: false,
          type: "location",
          defaultLocation: [113.330962, 23.111983],
        },
      ],
      map: null,
      layer: {
        image: null,
        vector: null,
        cva: null,
      },
      longitude: 115.9968,
      latitude: 28.5636,
      show: false,
      actions: [
        {
          name: "100m",
          value: 100,
        },
        {
          name: "200m",
          value: 200,
        },
        {
          name: "500m",
          value: 500,
        },
        {
          name: "1000m",
          value: 1000,
        },
        {
          name: "2000m",
          value: 20000,
        },
        {
          name: "5000m",
          value: 50000,
        },
        {
          name: "10000m",
          value: 10000,
        },
      ],
      radius: 200,
      editplacesBool: false,
      placeitem: null,
    };
  },
  created() {},
  mounted() {
    console.log("mounted");
    // this.init();
  },
  methods: {
    init() {
      // const map = this.map;
      // if (map && map.remove) {
      //   map.off();
      //   map.remove();
      // }
      const _this = this;
      setTimeout(() => {
        var map = L.map("viewDiv").setView([this.latitude, this.longitude], 4);
        this.map = map;

        var image = L.tileLayer(
          "http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=11c1c39e8539023ec9a601dfc23ccad8",
          {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          }
        ).addTo(map);

        var vector = L.tileLayer(
          "http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=11c1c39e8539023ec9a601dfc23ccad8",
          {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          }
        ).addTo(map);

        var cva = L.tileLayer(
          "http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=11c1c39e8539023ec9a601dfc23ccad8",
          {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
          }
        ).addTo(map);

        cva.remove();
        image.remove();
        cva.addTo(map);

        this.layer = {
          image,
          vector,
          cva,
        };

        map.removeControl(map.zoomControl);
        map.removeControl(map.attributionControl);

        map.on("move", function (ev) {
          // console.log(map.getCenter());
          _this.longitude = map.getCenter().lng;
          _this.latitude = map.getCenter().lat;
        });

        console.log(map.getCenter());
      }, 0);
    },
    checkoutLayer(item) {
      const map = this.map;
      const { cva, image, vector } = this.layer;

      if (item.type == "location") {
        if (item.checked) {
          getCurrentLocation2().then((returnData) => {
            var LeafIcon = L.Icon.extend({
              options: {
                shadowUrl:
                  "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                iconSize: [30, 30],
                shadowSize: [0, 0],
                iconAnchor: [-0, 0],
                shadowAnchor: [0, 0],
                popupAnchor: [0, 0],
              },
            });

            var greenIcon = new LeafIcon({
              iconUrl:
                "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            });

            if (returnData?.latitude) {

              // console.log(returnData);
              map.flyTo(
                { lon: returnData.longitude, lat: returnData.latitude },
                13,
                { animate: true, duration: 1 }
              );

              setTimeout(() => {
                
                console.log(returnData);
                this.point1 = L.circle([returnData.latitude, returnData.longitude], { radius : 200, color: "#f00"}).addTo(map);
                this.point2 = L.circle([returnData.latitude, returnData.longitude], { radius : 5, color: "#00f", stroke: true, fill: true, fillColor: "#00f", fillOpacity: 1}).addTo(map);
              }, 1000);

              this.geometry = {
                coordinates: [returnData.longitude, returnData.latitude],
                type: "Point",
                accuracy: returnData.accuracy,
              };
            } else {
              if(window.plus) {
                plus.geolocation.getCurrentPosition(
                function (position) {
                 let returnData = position.coords;
                  map.flyTo(
                    { lon: returnData.longitude, lat: returnData.latitude },
                    13,
                    { animate: true, duration: 1 }
                  );

                  setTimeout(() => {
                     console.log(this.point1);
                      console.log(returnData);
                      this.point1 = L.circle([returnData.latitude, returnData.longitude], { radius : 200, color: "#f00"}).addTo(map);
                      this.point2 = L.circle([returnData.latitude, returnData.longitude], { radius : 5, color: "#00f", stroke: true, fill: true, fillColor: "#00f", fillOpacity: 1}).addTo(map);
                  }, 1000);

                  this.geometry = {
                    coordinates: [returnData.longitude, returnData.latitude],
                    type: "Point",
                    // accuracy: returnData.accuracy,
                  };
                })
              }
              else {
                this.$toast("位置获取失败，请检查是否开启定位权限");
              }
     
              console.log(returnData);
            }

            // [returnData.latitude, returnData.longitude],
          });
        } else {
          map.flyTo({ lon: this.longitude, lat: this.latitude }, 3, {
            animate: true,
            duration: 1,
          });

          this.point1.remove();
          this.point2.remove();
        }
      } else if (item.type == "imagery") {
        if (item.checked) {
          vector.remove();
          cva.remove();

          image.addTo(map);
          cva.addTo(map);
        } else {
          image.remove();
          cva.remove();
          vector.addTo(map);
          cva.addTo(map);
        }
      } else if (item.type == "building") {
        if (item.checked) {
        } else {
        }
      }
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      console.log(item);
      this.radius = item.value;
    },
    leftClose() {
      this.$parent.mapcomponentControl = false;
    },
    rightSure() {
      console.log(this.editplacesBool, this.placeitem);

      const map = this.map;

      // map.remove();
      // map.off();
      // this.geometry = {
      //       coordinates: [returnData.longitude, returnData.latitude],
      //       type: "Point",
      //       accuracy: returnData.accuracy,
      // }
      // this.map.de

      if (this.longitude && this.latitude && this.radius) {
        // 修改
        if (this.editplacesBool && this.placeitem) {
          this.$parent.getPosition.map((item) => {
            if (item.id == this.placeitem.id) {
              item.geometry = {
                coordinates: [this.longitude, this.latitude],
                type: "Point",
              };
              item.radius = this.radius;
              // item.coordinates = [this.longitude, this.latitude];
              // item.radius = this.radius;
            }
          });
          this.$toast("位置修改成功");
          this.editplacesBool = false;
          this.placeitem = null;
        }
        // 添加
        else {
          this.$parent.getPosition.push({
            id: Date.now(),
            geometry: {
              coordinates: [this.longitude, this.latitude],
              type: "Point",
            },
            radius: this.radius,
          });
          this.$toast("位置设置成功");
        }

        // 更新通知
        this.$emit("updateplaces", 123131);

        setTimeout(() => {
          this.$parent.mapcomponentControl = false;
          if (map && map.remove) {
            map.off();
            map.remove();
          }
        }, 200);
      } else {
        this.$toast("请设置位置和范围");
      }
    },
    editplaces(placeitem) {
      console.log(placeitem);
      this.placeitem = placeitem;
      this.editplacesBool = true;
      this.longitude = placeitem?.geometry?.coordinates[0];
      this.latitude = placeitem?.geometry?.coordinates[1];
      this.radius = placeitem?.radius;
      this.init();
      console.log(this.placeitem, this.editplacesBool);
    },
    changeviewmapFun(item) {
      const map = this.map;
      console.log(item);
      if (!item?.lonlat) {
        console.log("不符合条件");
        return;
      }

      let pointarray = item?.lonlat?.split(",");
      console.log(this.map);
      console.log(pointarray);
      this.map.flyTo({ lon: pointarray[0], lat: pointarray[1] }, 14, {
        animate: true,
        duration: 2,
      });

      setTimeout(() => {
        this?.positionLayer?.remove();
        this?.positionLayer2?.remove();
        var positionLayer = L.circle([pointarray[1], pointarray[0]], { radius : 200, color: "#f00"}).addTo(map);
        var positionLayer2 = L.circle([pointarray[1], pointarray[0]], { radius : 5, color: "#00f", stroke: true, fill: true, fillColor: "#00f", fillOpacity: 1}).addTo(map);
        positionLayer2.bindPopup(item.name).openPopup();
        positionLayer.bringToFront();
        this.positionLayer = positionLayer;
        this.positionLayer2 = positionLayer2;
      }, 2000);

    },
  },
};
</script>
