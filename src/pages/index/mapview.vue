<!--
 * @Author: 王朋坤
 * @Date: 2022-04-06 11:53:36
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-07 17:06:43
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
    <div id="tool-control" style="position: relative">
      <searchplaces @changeviewmap="changeviewmapParent"> </searchplaces>
      <div class="mine-single-line-three-001">
        <div>{{ "底图设置" }}</div>
        <div @click="changebasemap">{{ layersControllabel }}</div>
        <div><van-icon name="arrow" /></div>
      </div>
      <div class="mine-single-line-three-001">
        <div>{{ "目标点位" }}</div>
        <div>{{ "点位跳转" }}</div>
        <div><van-icon name="arrow" /></div>
      </div>
    </div>
    <van-cell class="vantcellforsure" title="" is-link :value="'重新判断'" />
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
  height: 200px;
  overflow-y: auto;
  .searchtext-contain {
  }
  .searchtext-contain > div {
    background: #edf3ff;
    line-height: 20px;
    border-bottom: 1px solid #aaa;
    color: #0462ff;
    padding: 10px;
  }

  .searchtext-contain > div:last-of-type {
    border-bottom: 1px solid #fff;
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
    flex: 1 0 100px;
    // color: #444;
    color: #aaa;
    text-align: left;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #555;
  }
}

.mine-single-line-three-001:hover,
.mine-single-line-three-001:active {
  background-color: rgba(238, 238, 238, 0.377);
  transition: all 300ms;

  & > div:nth-of-type(2) {
    flex: 1 100px;
    color: #007aff;
    text-align: left;
  }
}

.van-popup--bottom.van-popup--round {
  border-radius: 0;
}

.vantcellforsure {
  position: absolute;
  bottom: 0;
  color: #000;
}
.vantcellforsure:active {
  background: #007aff;
  color: #fff;
  .van-cell__value {
    color: #fff;
  }
}
</style>

<script>
import {
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  ActionSheet,
  Icon,
} from "vant";
import L from "leaflet";
import { featureLayer, dynamicMapLayer } from "esri-leaflet";
import  * as esriLeafletVector from "esri-leaflet-vector"
import { getCurrentLocation2 } from "@/utils/geolocation.js";
import { geometry, point } from "@turf/helpers";
import searchplaces from "@/components/search.vue";
import axios from "axios";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "@/map/leaflet/L.LabelTextCollision.js";
import { data } from "@/map/leaflet/data.js";


export default {
  name: "mapapp",
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Icon.name]: Icon,
    searchplaces: searchplaces,
  },
  data() {
    return {
      result: [],
      layersControl: [
        {
          id: 1,
          name: "矢量样式",
          type: "vector",
        },
        {
          id: 0,
          name: "显示服务",
          type: "common",
        },

        {
          id: 2,
          name: "遥感样式",
          type: "imagery",
        },
        {
          id: 3,
          name: "酷黑样式",
          type: "black"
        }
      ],
      layersControllabel: "矢量样式",
      layersControlstart: 0,
      map: null,
      layer: {
        image: null,
        vector: null,
        cva: null,
        dy: null
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
    };
  },
  created() {},
  mounted() {
    console.log("mounted");
    // this.init();
    // setTimeout(() => {
    //   this.init2();
    // }, 1000);
    
  
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    inputsearch: function (newQuestion, oldQuestion) {
      const _this = this;
      console.log("改变");
      if (this.inputsearch) {
        // http://api.tianditu.gov.cn/v2/search
        this.placessearch({ keyWord: this.inputsearch })
        .then((data) => {
          _this.searchPoiData = [];
          // _this.inputsearchshow = false;
          console.log(data);
          let searchPoiArray = [];
          if (data?.pois) {
            data.pois.forEach((element) => {
              searchPoiArray.push({
                key: Date.now() + Math.random(),
                name: element.name + "," + element.address,
                lonlat: element.lonlat,
                address: element.address,
              });
              _this.searchPoiData = searchPoiArray;
            });
          } else if (data?.area) {
            searchPoiArray.push({
              key: Date.now() + Math.random(),
              name: data.area.name,
              lonlat: data.area.lonlat,
            });
            _this.searchPoiData = searchPoiArray;
          }
        });

        if (!this.inputsearchshow) {
          this.inputsearchshow = true;
        }
      }
    },
    searchPoiData: function () {
      if (!this.searchPoiData.length) {
        this.inputsearchshow = false;
      }
    },
  },
  methods: {
    init2() {
      console.log("init2");
        var osmUrl = "http://tile.openstreetmap.jp/{z}/{x}/{y}.png";
    var osm = new L.TileLayer(osmUrl, {
      maxZoom: 18,
    });

    var labelTextCollision = new L.LabelTextCollision({
      collisionFlg: true,
    });

    var map = new L.Map("viewDiv", {
      layers: [osm],
      center: new L.LatLng(35.695786, 139.749213),
      zoom: 10,
      renderer: labelTextCollision,
    });

    var p = L.polyline(
      [
        [35.695786, 139.749213],
        [35.696786, 139.748213],
        [35.695786, 139.747213],
      ],
      {
        weight: 12,
        color: "#bfa",
        text: "Leaflet.LabelTextCollision!!!!!!!!",
      }
    ).addTo(map);

    var layers = L.featureGroup().addTo(map);

    for (var index in data) {
      var d = data[index];
      var latlng = L.latLng(d[0], d[1]);
      var c = L.circleMarker(latlng, {
        radius: 5,
        text: latlng.toString(),
      });
      layers.addLayer(c);
      if (index == 3000) {
        break;
      }
    }
    var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
    var polygon = L.polygon(latlngs, {color: 'red', text: "eeeeee"}).addTo(map);
    

    // zoom the map to the polygon
    map.fitBounds(polygon.getBounds());

    function setCollisionDetection(flg) {
      labelTextCollision.options.collisionFlg = flg;
      map.fitBounds(map.getBounds());
    }
    },
    init() {
      let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      const _this = this;
      setTimeout(() => {
        // 116.020604', '28.684420
        // var map = L.map("viewDiv").setView([34, 115], 4);
        var labelTextCollision = new L.LabelTextCollision({
          collisionFlg: true,
        });
        var map = L.map("viewDiv", {
          renderer: labelTextCollision,
        }).setView([28.68442, 116.020604], 13);
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

        var black = esriLeafletVector.vectorBasemapLayer('OSM:DarkGray', {
          apikey: "AAPKa98807cea895417f85529b82dc345541eO67fp-eYPxYVFyIntFC3ZJTLXOl3rWzuxMXvJyVLKg9Wub325yHmArNXrVauz1A" // Replace with your API key - https://developers.arcgis.com
        }).addTo(map);
        
       
        map.removeControl(map.zoomControl);
        map.removeControl(map.attributionControl);
        
        black.remove();
        cva.remove();
        image.remove();
        cva.addTo(map);


        // let dy = dynamicMapLayer({
        //   url: "http://123.56.80.80:6080/arcgis/rest/services/schoolLocation/MapServer",
        //   opacity: 1
        // })
        // var dy = featureLayer({
        //     url: 'https://maps.pasda.psu.edu/arcgis/rest/services/pasda/CityPhillyPlanning/MapServer/2'
        //   }).addTo(map);

        let dy = dynamicMapLayer({
          url: "http://123.56.80.80:6080/arcgis/rest/services/schoolLocation/MapServer",
          opacity: 1
        })

       
        dy.once("load", function (evt) {
          console.log(evt);
          
        })
        .addTo(map);

        
        dy.remove();

        this.layer = {
          image,
          vector,
          cva,
          black,
          dy
        };

      var myIcon = L.icon({
          iconUrl: require('@/assets/img/home/clock.svg'),
          iconSize: [38, 95],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          // shadowUrl: 'my-icon-shadow.png',
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
      });


        var positionLayer = L.circle([28.68442, 116.020604], { radius : 100, color: "#f00"}).addTo(map);
        var positionLayer2 = L.circle([28.68442, 116.020604], { radius : 5, color: "#00f", stroke: true, fill: true, fillColor: "#00f", fillOpacity: 1}).addTo(map);
        positionLayer2.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
        // positionLayer.bringToFront();
      }, 0);
      
    },
    leftClose() {
      const map = this.map;
      if (map && map.remove) {
          map.off();
          map.remove();
      }
      this.$parent.mapviewControl = false;

    },
    changeviewmapParent(item) {
      // console.log(item.lonlat);
      // console.log(item, "传递的值");
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
    },
    changebasemap() {
      const map = this.map;
      const { cva, image, vector, black, dy } = this.layer;

      this.layersControlstart++;
      let start = this.layersControlstart % this.layersControl.length;
      console.log(start);
      if (this.layersControl[start].type == "vector") {
        this.layersControllabel = this.layersControl[start].name;
        image.remove();
        cva.remove();
        black.remove();
        vector.addTo(map);
        cva.addTo(map);
        dy.remove();
      } else if (this.layersControl[start].type == "imagery") {
        this.layersControllabel = this.layersControl[start].name;
        vector.remove();
        black.remove();
        cva.remove();
        image.addTo(map);
        cva.addTo(map);
        dy.remove();
      }
      else if(this.layersControl[start].type=="black") {
        this.layersControllabel = this.layersControl[start].name;
        black.addTo(map);
        vector.remove();
        image.remove(map);
        cva.remove();
        dy.remove();
      }
      else if(this.layersControl[start].type=="common") {
        this.layersControllabel = this.layersControl[start].name;
        black.remove();
        vector.remove();
        cva.remove();
        image.addTo(map);
        dy.addTo(map);
      }
    },
    startmapview() {
      this.init();
    }
  },
};
</script>
