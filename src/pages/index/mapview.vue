<!--
 * @Author: 王朋坤
 * @Date: 2022-04-06 11:53:36
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-06 15:28:02
 * @FilePath: /graduation-project-master/src/pages/index/mapview.vue
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
      <div class="text">打卡判断</div>
    </div>
    <div id="viewDiv" style="position: relative">
      <div
        style="
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30px;
          line-height: 30px;
          background: #f1f1f4a3;
          z-index: 1000;
          padding-left: 10px;
        "
      >
        定位坐标：{{ Number(longitude).toFixed(7) }} ，{{
          Number(latitude).toFixed(7)
        }}
      </div>
    </div>
    <div id="tool-control" style="position:relative;">
      <van-search v-model="inputsearch" placeholder="请输入搜索关键词" @focus="focussearch" @blur="bluesearch" @clear="bluesearch"/>
      <div style="position:absolute;width:100%;z-index:100;" class="searchtext" v-show="inputsearchshow"> 
        <div style="width:90%;margin:0 auto;background:#bfa;border-radius:5px;" class="searchtext-contain">
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
        </div>
      </div>
      <div
        class="mine-single-line-three-001"
      >
        <div>{{ "地图设置" }}</div>
        <div >{{ "遥感底图" }}</div>
        <div><van-icon name="arrow" /></div>
      </div>
      <div
        class="mine-single-line-three-001"
      >
        <div>{{ "目标点位" }}</div>
        <div >{{ "预设点位" }}</div>
        <div><van-icon name="arrow" /></div>
      </div>

    </div>
          <van-cell
        class="vantcellforsure"
        is-link
        title="重新判断"
        :value="radius + '米'"
      />
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

.searchtext {
  transition: 1000ms all;
  .searchtext-contain {
    height: 200px;
    overflow-y: auto;
  }
  .searchtext-contain > div {
    height: 40px;
  }
}

/* 单行三个元素 */
.mine-single-line-three-001 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #8080802e;
  padding: 10px 8px;
  cursor: pointer;
  & > div:nth-of-type(1) {
    flex: 7 1 100px;
    padding-left: 10px;
    color: #444;
  }
  & > div:nth-of-type(2) {
    flex:  1 0 100px;
    // color: #444;
    color: #aaa;
    text-align: left;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #555;
  }
}

.mine-single-line-three-001:hover, .mine-single-line-three-001:active {
  background-color: rgba(238, 238, 238, 0.377);
  transition: all 300ms;

  & > div:nth-of-type(2) {
    flex:  1 100px;
    color: #007AFF;
    text-align: left;
  }
}

.van-popup--bottom.van-popup--round {
  border-radius: 0;
}

.vantcellforsure {
    position: absolute;
  bottom: 0;
  background: #fff;
  border: 0px dotted #007AFF;
  border-radius: 5px;
  color: #000;
}
 .vantcellforsure:active{
  background: #007AFF;
  color: #fff;
  .van-cell__value {
  color: #fff;
}
}

.van-cell {

}

</style>

<script>
import { Checkbox, CheckboxGroup, Cell, CellGroup, ActionSheet, Icon, Search } from "vant";
import L from "leaflet";
import { getCurrentLocation2 } from "@/utils/geolocation.js";
import { geometry, point } from "@turf/helpers";
export default {
  name: "mapapp",
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Icon.name]: Icon,
    [Search.name]: Search
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
      radius: 200,
      editplacesBool: false,
      placeitem: null,
      inputsearch: "",
      inputsearchshow: false
    };
  },
  created() {},
  mounted() {
    console.log("mounted");
    this.init();
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    inputsearch: function (newQuestion, oldQuestion) {
      console.log("改变");
      if(this.inputsearch) {
        if(!this.inputsearchshow) {
          this.inputsearchshow = true;
        }
      }
    }
  },
  methods: {
    init() {
      const _this = this;
      setTimeout(() => {
        var map = L.map("viewDiv").setView([34, 115], 4);
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

            console.log(returnData);
            var point = L.marker([returnData.latitude, returnData.longitude], {
              icon: greenIcon,
            }).addTo(map);

            // console.log(returnData);
            map.flyTo(
              { lon: returnData.longitude, lat: returnData.latitude },
              13,
              { animate: false, duration: 0.5 }
            );

            this.geometry = {
              coordinates: [returnData.longitude, returnData.latitude],
              type: "Point",
              accuracy: returnData.accuracy,
            };

            // [returnData.latitude, returnData.longitude],
          });
        } else {
          map.flyTo({ lon: 115.304657, lat: 36.110565 }, 8, {
            animate: false,
            duration: 0.5,
          });
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
    leftClose() {
      this.$parent.mapcomponentControl = false;
    },
    focussearch() {
      if(!this.inputsearchshow) {
        this.inputsearchshow = true;
      }
      // if(this.inputsearch != "" ) {
      //   this.inputsearchshow = true;
      // }
      console.log("focussearch");
    },
    bluesearch() {
      console.log("bluesearch");
      this.inputsearchshow = false;
    }
  },
};
</script>
