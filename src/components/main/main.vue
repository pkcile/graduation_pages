<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-10-21 19:42:51
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
import axios from "axios";

export default {
  name: "test001",
  data() {
    return {
      formData: {
        // 1.登陆获取信息
        login: {
          "role": "学生",
          "name": "王朋坤",
          "username": "pkcile",
          "task_radius": "300",
          "task_starttime": "2021-07-09 11:19:00",
          "task_endtime": "2021-07-14 11:19:00",
          "task_placename": "",
          "task_id": "40"
        },
        // 2.用户提交信息
        get: {
          locationItem: "",
          sendDatabase: {
            task_id: 20,
            comment: "评论内容",
            datenow: "2021-10-15 10:12",
            username: "pkcile",
            task_status: 2
          },
        }
      }
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
    // 获取位置、分析位置
    getCurrentLocation() {
      // 位置点、面
      const positionPoint = turf.point([116.02624654769897, 28.68687471077349]);
      this.$store.state.Login.get.locationItem.positionPoint = positionPoint;
      this.$router.push("map");
    },
    // 发送信息
    analyseAndSend() {},
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
