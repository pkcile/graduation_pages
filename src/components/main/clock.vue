<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-11-03 09:27:49
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
        <span>{{ $store.state.User.login.task_starttime }}</span>
      </li>
      <li>
        <span>结束时间</span>
        <span>{{ $store.state.User.login.task_endtime }}</span>
      </li>
      <li>
        <span>打卡地点</span>
        <span>{{ $store.state.User.login.task_placename }}</span>
      </li>
      <li style="background: #efeff3"><span>备注</span></li>
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="请详细描述你的问题和意见..."
        v-model="$store.state.User.get.sendDatabase.comment"
      ></textarea>
    </ul>
    <!-- 按钮 -->
    <div
      class="mine-button-block bottom-fix"
      v-on:click="getCurrentLocation"
      style="margin-top: 20px"
    >
      获取定位
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.$notify({ type: "primary", message: "欢迎来到打卡模块" });
  },
  methods: {
    // 获取位置
    getCurrentLocation() {
      const _this = this;
      const geoOption = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        // timeout           : 5000
      };

      if ("geolocation" in navigator) {
        _this.$toast("正在获取位置");
        navigator.geolocation.getCurrentPosition(
          function (data) {
            _this.$store.state.User.get.locationItem.positionPoint = {
              latitude: data.coords.latitude,
              longitude: data.coords.longitude,
            };
            _this.$router.push("map");
          },
          geoError,
          geoOption
        );
      } else {
        _this.$toast("不支持定位");
      }

      function geoError() {
        navigator.geolocation.getCurrentPosition(function () {
          _this.$store.state.User.g饿et.locationItem.positionPoint = {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          };
          _this.$router.push("map");
        });
        // _this.$toast("定位发生错误，chorme浏览器不支持定位，请更换浏览器");
      }
    },
  },
  components: {},
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
