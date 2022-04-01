<!--
 * @Author: 王朋坤
 * @Date: 2022-04-01 16:36:02
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-01 16:36:02
 * @FilePath: /graduation-project-master/src/pages/mine/mine.vue
 * @Description: 
-->
<template>
  <div class="home-mine">
    <!-- 用户信息设置 -->
    <div class="mine-form-user-information">
      <img :src="this.$store.state.User.login.userinformation ?this.$store.state.User.login.userinformation.imglink : `${require('@/assets/img/user/1.jpg')}`" alt="" />
      <div class="user-main">
        <div>{{ this.$store.state.User.login.userinformation ? "昵称：" + this.$store.state.User.login.userinformation.username : "guest" }}</div>
        <div>{{ this.$store.state.User.login.userinformation ?  "学号：" + this.$store.state.User.login.userinformation.studynth : "000" }}</div>
      </div>
      <div class="user-jump"  :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
    </div>
    <!-- 用户信息查看 -->
    <ul class="mine-form-display-infor" style="">
      <li>
        <span>{{ "个人说明"}}</span>
        <span>{{ this.$store.state.User.login.userinformation ?  "" + this.$store.state.User.login.userinformation.showinfor : "默认签名" }}</span>
      </li>
      <li>  
        <span>注册时间</span>
        <span>{{ this.$store.state.User.login.userinformation ?  "" + this.$store.state.User.login.userinformation.register : "2018-09-10 09:00"  }}</span>
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
import { Dialog } from 'vant';
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component.name,
  },
  methods: {
    loginOut() {
      this.$router.push("/user/login");
      window.sessionStorage.clear("loginData");
      this.$toast("注销登陆成功");
    },
    // components: {
    //   [Dialog.name]: Dialog
    // }
  },
  mounted() {
    console.log(this.$store );
    // this.$notify({type: "primary", message: "欢迎来到个人中心"});
  }
}
</script>

<style lang="scss" scoped>
.home-mine {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.van-dialog .van-dialog--default {
  border-radius: 8px !important;
  // border-radius: 16px;
}

</style>
