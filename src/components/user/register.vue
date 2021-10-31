<!--
 * @Author: your name
 * @Date: 2021-10-25 23:08:53
 * @LastEditTime: 2021-10-31 16:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/register.vue
-->

<template>
  <div class="register">
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
              v-model="register.username"
            />
          </div>
          <div class="mine-input-line"></div>
          <div class="mine-input-row">
            <label>学号</label>
            <input type="text" placeholder="请输入学号" v-model="register.nth" />
          </div>
          <div class="mine-input-line"></div>
          <div class="mine-input-row">
            <label>密码</label>
            <input
              type="text"
              placeholder="请输入密码"
              v-model="register.password"
            />
          </div>
          <div
            class="mine-button-block"
            style="margin-top: 18px"
            @click="userRegister"
          >
            注册
          </div>
        </form>
      </div>
    </main>
    <!-- 导航 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import { NavBar } from "vant"

export default {
  data() {
    return {
      register: {
        username: null,
        password: "1234",
        nth: null,
      },
    };
  },
  methods: {
    userRegister() {
      const _this = this;
      if (this.register.username && this.register.nth) {
        if (!_this.register.password) {
          _this.register.password = "1234";
        }

        _this.$store.dispatch("User/registerAccount", {
          register: _this.register,
          Router: _this.$router,
          Toast: _this.$toast,
        });
      } else {
        this.$toast("请输入完整昵称和学号");
      }
    },
    goBack() {
      this.$router.push("/user/login");
    },
  },
  created() {},
  components: {
    [NavBar.name]: NavBar
  }
};
</script>

<style scoped lang="scss">
.register {
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


