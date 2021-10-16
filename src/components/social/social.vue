<!--
 * @Author: your name
 * @Date: 2021-10-14 19:46:07
 * @LastEditTime: 2021-10-16 14:52:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/social/social.vue
-->

<template>
  <div class="home-social">

  </div>
</template>

<script>
import login from "@/api/login/login.js";
import studentTask from "@/api/studentTask.js";

login({username: "pkcile", password: "1234"}).then(res => {
  console.log(res);
});


studentTask({"queryStudent":[{"username": "nur","select": "1"}, {"username": "wpk","select": "1"}], "task_id": "21"}).then(res => {
  console.log(res);
});



// console.log(this.$store.dispatch("login", {login: login, params: {username: "pkcile", password: "1234"}}));

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
