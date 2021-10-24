<!--
 * @Author: your name
 * @Date: 2021-10-14 19:46:07
 * @LastEditTime: 2021-10-24 17:49:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/social/social.vue
-->

<template>
  <div class="home-social">
    <div v-for="todo in currentContact" v-bind:key="todo">
      {{ todo.text }}
      <van-contact-card
      type="edit"
      :name="todo.user_username"
      :tel="todo.comment + '日期：' + todo.edittime"
      :ccc="todo.ccc"
      @click="onEdit"
    />
    </div>

  </div>
</template>

<script>
import login from "@/api/login/login.js";
import studentTask from "@/api/studentTask.js";
import axios from "axios"

let params = {username: "pkcile", password: "1234"};

export default {
  beforeCreate() {
    const _this = this;
    // 数据发送
    axios.get(`${process.env.VUE_APP_POSITION_PATH}/api/position/recordShow`).then(function(returnData) {
      console.log(returnData.data);
      _this.currentContact = returnData.data.recordShow;
      console.log(_this.currentContact);
     
    });
  },
  data() {
    return {
      currentContact: {
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
