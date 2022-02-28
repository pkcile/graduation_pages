<!--
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-12-12 11:01:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\App.vue
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css"

export default {
  
}


</script>
<style lang="scss">
body, html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #EFEFF3;
  // background: #F7F8FA;
  // background: url('https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWLNb9?ver=6f2d')
}

#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
