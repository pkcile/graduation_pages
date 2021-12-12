<!--
 * @Author: your name
 * @Date: 2021-12-12 13:56:07
 * @LastEditTime: 2021-12-12 15:47:18
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
