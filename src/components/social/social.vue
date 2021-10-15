<!--
 * @Author: your name
 * @Date: 2021-10-14 19:46:07
 * @LastEditTime: 2021-10-15 10:17:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/social/social.vue
-->

<template>
  <div class="home-social">

  </div>
</template>

<script>
import login from "@/api/login/login.js"

// console.log();
login({username: "pkcile", password: "1234"}).then(res => {
  console.log(res);
});

// console.log(this.$store.dispatch("login", {login: login, params: {username: "pkcile", password: "1234"}}));


// console.log(login);
// import axios from "axios"
// console.log(axios);
// // 向给定ID的用户发起请求
// axios.get('/api/position/login/username/pkcile/password/1234/')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//   });

let params = {username: "pkcile", password: "1234"};

export default {
  created() {
    console.log(this.$store.state.count);
    console.log(this.$store.dispatch("login", {login, params}));
    // login.
  }
}
</script>

<style lang="scss" scoped>

</style>
