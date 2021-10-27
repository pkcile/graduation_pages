<!--
 * @Author: your name
 * @Date: 2021-10-25 23:08:53
 * @LastEditTime: 2021-10-27 11:05:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/register.vue
-->

<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar
      class="header"
      title="注册页面"
      left-arrow
      @click-left="goBack"
    />
    <!-- 内容区域 -->
    <main class="main">
      <div style="padding-top: 15px">
        <form>
          <div class="mine-input-row">
            <label>昵称</label>
            <input
              type="text"
              placeholder="请输入昵称"
              v-model="login.username"
            />
          </div>
          <div class="mine-input-line"></div>
          <div class="mine-input-row">
            <label>学号</label>
            <input
              type="text"
              placeholder="请输入学号"
              v-model="login.nth"
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
          <div class="mine-button-block" style="margin-top: 18px;" @click="userRegister">注册</div>
        </form>
      </div>
    </main>
    <!-- 导航 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: null,
        password: "1234",
        nth: null
      }
    };
  },
  methods: {
    userRegister() {
      const _this = this;
      if(this.login.username && this.login.nth) {
        if(!_this.login.password) {
          _this.login.password = "1234";
        }
      }
      else {
        this.$toast("请输入完整昵称和学号");
      }
    },
    goBack() {
      this.$router.push("/user/login");
    }
  },
  created() {

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


