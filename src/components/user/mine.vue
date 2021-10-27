<!--
 * @Author: your name
 * @Date: 2021-10-13 10:51:39
 * @LastEditTime: 2021-10-27 11:01:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/mine/mine.vue
-->

<template>
  <div class="home-mine">
    <!-- 用户信息设置 -->
    <div class="mine-form-user-information">
      <img src="@/assets/img/user/1.jpg" alt="" />
      <div class="user-main">
        <div>{{ $store.state.User.login.name }}</div>
        <div>{{ "201824803050" }}</div>
      </div>
      <div class="user-jump"></div>
    </div>
    <!-- 用户信息查看 -->
    <ul class="mine-form-display-infor" style="">
      <li>
        <span>{{ "个人说明"}}</span>
        <span>{{ "武功再高，也怕菜刀" }}</span>
      </li>
      <li>
        <span>上次登陆</span>
        <span>{{ "2021-10-13 17:56" }}</span>
      </li>
      <li>
        <span>打卡日志</span>
        <span></span>
      </li>
    </ul>
    <!-- 用户功能设置 -->
    <div class="mine-button-block mine-button-white" @click="loginOut">退出登录</div>
  </div>
</template>

<script>
import "@/assets/style/common/mobile-form.scss"
export default {
  methods: {
    loginOut() {
      // 1.清除信息
      // 2.跳转
      this.$router.push("/user/login");
    }
  }
  
}
</script>

<style lang="scss" scoped>
.home-mine {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

</style>