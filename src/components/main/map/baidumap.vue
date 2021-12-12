<!--
 * @Author: your name
 * @Date: 2021-12-12 13:56:07
 * @LastEditTime: 2021-12-12 17:16:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \graduation-project\src\components\main\map\baidumap.vue
-->
<template>
  <div id="mapbaidu">
    <div class="list" :id="mapId" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
import loadBMap from "@/map/baidu/init.js";
import coordtransform from "coordtransform";

export default {
  data() {
    return {
      mapId: "BMap-" + parseInt(Date.now() + Math.random()),
      mapId: "mapId",
      myMap: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      loadBMap("74SeVoIxamZsKnAjgFsN8fecdAdrmAA9")
        .then(() => {
          this.myMap = new BMapGL.Map(this.mapId); 
          this.myMap.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15); 
          this.myMap.enableScrollWheelZoom(true); 
          // coordtransform.
          // coordtransform.bd09togcj02(116.404, 39.915);
          // coordtransform.gcj02towgs84(116.404, 39.915);

          // var wgs84togcj02 = coordtransform.wgs84togcj02(116.404, 39.915);
          // var gcj02tobd09 = coordtransform.gcj02tobd09(116.404, 39.915);
          var gcj = coordtransform.wgs84togcj02(116.02700293064119,28.682474537585097);
          console.log(coordtransform.gcj02tobd09(gcj[0], gcj[1]) );

        })
        .catch((err) => {
          console.log("地图加载失败");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#mapbaidu {
  width: 100%;
  height: 100%;
}
</style>
