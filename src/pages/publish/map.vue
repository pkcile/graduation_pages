<!--
 * @Author: 王朋坤
 * @Date: 2022-03-28 10:26:00
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-28 16:04:14
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
      ></div>
      <div class="text">位置拾取</div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
        }"
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
        :value="actionsSelect + '米'"
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
import { point } from "@turf/helpers";
export default {
  name: "mapapp",
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
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
        // {
        //   id: 2,
        //   name: "校园建筑",
        //   checked: true,
        //   type: "building",
        // },
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
      longitude: null,
      latitude: null,
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
      actionsSelect: 200,
    };
  },
  created() {},
  mounted() {
    console.log("mounted");
    // this.init();
    const _this = this;
    setTimeout(() => {
      var map = L.map("viewDiv").setView([51.505, -0.09], 13);
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

      map.on("move", function (ev) {
        // console.log(map.getCenter());
        _this.longitude = map.getCenter().lng;
        _this.latitude = map.getCenter().lat;
      });

      console.log(map.getCenter());
    }, 3000);
  },
  methods: {
    init() {
      var map = L.map("viewDiv").setView([51.505, -0.09], 13);

      var tiles = L.tileLayer(
        "http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=11c1c39e8539023ec9a601dfc23ccad8",
        {
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        }
      ).addTo(map);

      var tiles2 = L.tileLayer(
        "http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=11c1c39e8539023ec9a601dfc23ccad8",
        {
          subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
        }
      ).addTo(map);

      console.log(map.getCenter());

      map.on("move", function (ev) {
        console.log(map.getCenter());

        this.longitude = map.getCenter().lon;
        this.latitude = map.getCenter().lat;
      });
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

console.log(returnData);
            var point = L.marker([returnData.latitude, returnData.longitude], {
              icon: greenIcon,
            }).addTo(map);


          // console.log(returnData);
          map.flyTo({lon: returnData.longitude, lat: returnData.latitude}, 13, {animate: false, duration:0.5});

          // [returnData.latitude, returnData.longitude], 9

          });


        } else {
           map.flyTo({lon: 115.304657, lat: 36.110565}, 8, {animate: false,duration:0.5});
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
      this.actionsSelect = item.value;
    },
  },
};
</script>
