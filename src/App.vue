<!--
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-11-04 09:57:58
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
}

#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
