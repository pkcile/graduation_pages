<!--
 * @Author: your name
 * @Date: 2021-10-24 22:44:46
 * @LastEditTime: 2022-03-15 09:32:22
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/login.vue
-->

<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar class="header" title="登陆页面" />
    <!-- 内容区域 -->
    <main class="main" >
      <form style="padding-top: 15px">
        <div v-bind:key="inputItem.key" v-for="inputItem in pageData.items">
          <div class="mine-input-row">
            <label>{{inputItem.title}}</label>
            <input type="text" :placeholder="inputItem.inputplaceholder" v-model="inputItem.value" />
          </div>
          <div class="mine-input-line"></div>
        </div>
        <van-checkbox-group v-model="result" style="margin-top: 25px">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              :key="item.key"
              :title="`${item.value}`"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item.value" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </form>
      <div
        class="mine-link-center"
        style="position: sticky; bottom: 20px; left: 0"
      >
        <div
          class="mine-button-block"
          style="margin-top: 18px"
          @click="loginIn"
        >
          登陆
        </div>
        <span @click="registerAccount">注册账号</span>
        <span>|</span>
        <span @click="forgetAccount">忘记密码</span>
      </div>
    </main>
    <!-- 导航 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import axios from "axios";
import { NavBar, Cell, CellGroup, Checkbox, CheckboxGroup } from "vant";
export default {
  data() {
    return {
      login: {
        username: null,
        password: null,
      },
      list: [
        {
          key: 1,
          value: "快捷签到",
          value2: "study",
        },
      ],
      pageData: {
        items: [
          {
            key: 1,
            title: "账号",
            inputplaceholder: "用户名或学号",
            value: "",
          },
          {
            key: 2,
            title: "密码",
            inputplaceholder: "请输入密码",
            value: "",
          },

        ],
        register: {
          title: "注册",
        },
      },
      result: [],
    };
  },
  methods: {
    loginIn() {
      const _this = this;
      if (this.login.username && this.login.password) {
        _this.$store.dispatch("User/loginIn", {
          login: _this.login,
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
      // this.$toast("不要忘记密码，找不回来了 :)");
      this.$notify("默认密码：1234");
    },
    toggle(index) {
      console.log(index);
      console.log(this.result);

      console.log(this.$refs.checkboxes[index]);
    },
  },
  created() {},
  components: {
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
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

