<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-10-19 17:53:00
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
        <span>{{ formData.login.task_starttime }}</span>
      </li>
      <li>
        <span>结束时间</span>
        <span>{{ formData.login.task_endtime }}</span>
      </li>
      <li>
        <span>打卡地点</span>
        <span>{{ formData.login.task_placename }}</span>
      </li>
      <li style="background: #efeff3"><span>备注</span></li>
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="请详细描述你的问题和意见..."
        v-model="formData.get.comment"
      ></textarea>
    </ul>
    <!-- 按钮 -->
    <div class="mine-button-block bottom-fix" v-on:click="getCurrentLocation">
      获取定位
    </div>
    <!-- <map-view></map-view> -->
  </div>
</template>

<script>
import Vue from 'vue';
// import mapView from "./layer/map.vue"
export default {
  name: "test001",
  data() {
    return {
      formData: {
        // 1.登陆获取信息
        login: {
          role: "guest",
          name: "guest",
          username: "guest",
          task_radius: "未获取",
          task_starttime: "未获取",
          task_endtime: "未获取",
          task_placename: "未获取",
          task_id: "40",
        },
        // 2.用户提交信息
        get: {
          locationItem: {
            type: "Feature",
            properties: {
              title: "浏览器定位信息",
              collect_time: "2021-06-02 15:47",
              place_name: null,
              location_accuracy: null,
              location_timestamp: null,
              location_status: null,
            },
            geometry: {
              type: "Point",
              coordinates: [116.317967, 35.116952],
            },
          },
          comment: "",
          sendDatabase: {
            user_username: null,
            task_id: null,
            comment: null,
            datenow: "2021-10-15 10:12",
          },
        },
        // 3.控件控制信息
        control: {},
      },
      sendPart: {
        control: true,
      },
      getCurrentLocationData: {
        control: false,
        nth: 0,
        max: 3,
        locationItem: null,
      },
      esriMap: {
        containerId: "viewDiv",
        // 地图入口
        view: null,
        map: null,
        defaultConfig: {
          initPointXY: [116.02685261188525, 28.683314800285213],
          initZoomLevel: 15,
        },
      },
    };
  },
  mounted() {
    // // 信息初始化
    // this.$store.dispatch("login", {
    //   login,
    //   params: { username: "pkcile", password: "1234" },
    // });
    
  },
  methods: {
    // 弹窗显示控制
    changeSendPartControl() {
      this.sendPart.control = !this.sendPart.control;
    },
    // 获取位置、分析位置
    getCurrentLocation() {
      this.$router.push("map");
    },
    // 发送信息
    analyseAndSend() {},
  },
  components: {
    // mapView
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
