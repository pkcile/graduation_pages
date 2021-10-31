<!--
 * @Author: your name
 * @Date: 2021-10-14 19:46:07
 * @LastEditTime: 2021-10-31 15:24:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/social/social.vue
-->

<template>
  <div class="home-social">
    <van-cell title="打卡发布" icon="shop-o" @click="jumpToPublishForm">
      <template #right-icon>
        <van-icon name="search" class="search-icon"  style="display:flex;align-items:center;"/>
      </template>
    </van-cell>
    <van-cell title="动态显示" icon="shop-o">
      <template #right-icon>
        <van-icon name="search" class="search-icon"  style="display:flex;align-items: center;"/>
      </template>
    </van-cell>
    <!-- <van-cell title="位置签到" is-link arrow-direction="down" value="内容" /> -->
    <van-cell title="位置签到" icon="location-o"  />
    <van-cell title="统计导出" icon="location-o"  />
    <!-- <van-cell title="位置签到" is-link to="/home/map" /> -->
  </div>
</template>

<script>
import studentTask from "@/api/studentTask.js";
import axios from "axios"
import  {Cell, CellGroup, Icon } from "vant"
let params = {username: "pkcile", password: "1234"};

export default {
  beforeCreate() {
    const _this = this;
    // // 数据发送
    // axios.get(`${process.env.VUE_APP_POSITION_PATH}/api/position/recordShow`).then(function(returnData) {
    //   console.log(returnData.data);
    //   _this.currentContact = returnData.data.recordShow;
    //   console.log(_this.currentContact);
     
    // });
  },
  data() {
    return {
      currentContact: {
      }
    }
  },
  components :{
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
  },
  methods: {
    jumpToPublishForm() {
      this.$router.push("/home/admin");
      // this.$router
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
