<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-10-24 16:22:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /江西师大学生位置签到管理系统/graduation-project/page-view/src/components/main/main.vue
-->

<template>
  <div class="home-main">
    <!-- 表单 -->
    <ul class="mine-form-display" style="">
      <li>
        <span>开始时间</span>
        <span>{{ $store.state.Login.login.task_starttime }}</span>
      </li>
      <li>
        <span>结束时间</span>
        <span>{{  $store.state.Login.login.task_endtime }}</span>
      </li>
      <li>
        <span>打卡地点</span>
        <span>{{  $store.state.Login.login.task_placename }}</span>
      </li>
      <li style="background: #efeff3"><span>备注</span></li>
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="请详细描述你的问题和意见..."
        v-model="$store.state.Login.get.sendDatabase.comment"
      ></textarea>
    </ul>
    <!-- 按钮 -->
    <div class="mine-button-block bottom-fix" v-on:click="getCurrentLocation">
      获取定位
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "home",
  data() {
    return {
    };
  },
  mounted() {
    // // 信息初始化
    // this.$store.dispatch("login", {
    //   login,
    //   params: { username: "pkcile", password: "1234" },
    // });

  axios
    .get("./school-building.geojson")
    .then(function (initPosition) {
      window.localStorage.removeItem("initPositionData");
      window.localStorage.setItem(
        "initPositionData",
        JSON.stringify(initPosition?.data)
      );
    
  })
  },
  methods: {
    // 获取位置
    getCurrentLocation() {
      this.$store.state.Login.get.locationItem.positionPoint = {latitude: 28.68687471077349, longitude: 116.02624654769897};
      this.$router.push("map");
    }
  },
  components: {

  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.home-main {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  .bottom-fix {
    position: sticky;
    bottom: 20px;
    left: 0;
  }
}

</style>
