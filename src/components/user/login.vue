<!--
 * @Author: your name
 * @Date: 2021-10-24 22:44:46
 * @LastEditTime: 2021-10-31 16:45:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/login/login.vue
-->

<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar class="header" title="登陆页面" />
    <!-- 内容区域 -->
    <main class="main">
      <div style="padding-top: 15px">
        <form>
          <div class="mine-input-row">
            <label>账号</label>
            <input
              type="text"
              placeholder="请输入昵称"
              v-model="login.username"
            />
          </div>
          <div class="mine-input-line"></div>
          <div class="mine-input-row">
            <label>密码</label>
            <input
              type="text"
              placeholder="请输入密码"
              v-model="login.password"
            />
          </div>
          <div
            class="mine-button-block"
            style="margin-top: 18px"
            @click="loginIn"
          >
            登陆
          </div>
        </form>
        <div class="mine-link-center">
          <span @click="registerAccount">注册账号</span>
          <span>|</span>
          <span @click="forgetAccount">忘记密码</span>
        </div>
      </div>
    </main>
    <!-- 导航 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import axios from "axios";
import { NavBar } from "vant"
export default {
  data() {
    return {
      login: {
        username: null || "pkcile",
        password: null || "1234",
      },
    };
  },
  methods: {
    loginIn() {
      const _this = this;
      if (this.login.username && this.login.password) {
        _this.$store.dispatch("User/loginIn", {
          login: _this.login ,
          Router: _this.$router,
          Toast: _this.$toast,
        });
      } else {
        _this.$toast("请完整输入账户密码信息");
        // 如果都为空
        if (!_this.login.username && !_this.login.password) {
          _this.$toast("你是否尝试匿名登陆");
        }
      }
    },
    registerAccount() {
      window.sessionStorage.setItem("registerMark", "1");
      this.$router.push("/user/register");
    },
    forgetAccount() {
      this.$toast("不要忘记密码，找不回来了 :)");
    },
  },
  created() {},
  components: {
    [NavBar.name]: NavBar
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;

  .header {
    height: 56px;
    width: 100%;
  }

  .main {
    height: calc(100% - 126px);
    width: 100%;
  }

  .footer {
    height: 70px;
    width: 100%;
  }
}
</style>

