<!--
 * @Author: your name
 * @Date: 2021-10-25 23:08:53
 * @LastEditTime: 2022-03-14 23:34:56
 * @LastEditors: 王朋坤
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
          <div v-bind:key="inputItem.key" v-for="inputItem in pageData.items">
            <div
              class="mine-input-row"
              v-bind:class="{ greydispaly: inputItem.greydispaly }"
            >
              <label>{{ inputItem.title }}</label>
              <input
                type="text"
                :placeholder="inputItem.inputplaceholder"
                v-model="inputItem.value"
              />
            </div>
            <div class="mine-input-line" :style="{}"></div>
          </div>

          <div
            class="mine-button-block"
            @click="userRegister"
            style="margin-top: 18px; position: sticky; bottom: 20px; left: 0"
          >
            {{ pageData.register.title }}
          </div>
        </form>
      </div>
    </main>
    <!-- 导航 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import { NavBar } from "vant";
import axios from "axios";

export default {
  data() {
    return {
      pageData: {
        items: [
          {
            key: 1,
            title: "学号",
            inputplaceholder: "请输入学号",
            value: "",
            greydispaly: true,
          },
          {
            key: 2,
            title: "昵称",
            inputplaceholder: "默认为学号",
            value: "",
            greydispaly: false,
          },
          {
            key: 3,
            title: "密码",
            inputplaceholder: "默认为1234",
            value: "",
            greydispaly: false,
          },
        ],
        register: {
          title: "注册",
        },
      },
    };
  },
  methods: {
    userRegister() {
      const _this = this;
      const { studynth, password, nth } = {
        studynth: this.pageData.items[0].value,
        password: this.pageData.items[1].value,
        nth: this.pageData.items[2].value,
      };

      if (!studynth) {
        this.$notify("请输入学号");
      } 
      else {
        console.log(process.env.VUE_APP_POSITION_PATH);
        axios
          .get(`${process.env.VUE_APP_POSITION_PATH}/user/register`, {
            params: {
              studynth,
              password,
              nth
            }
          })
          .then((returnData) => {
            console.log
          });
      }

      //   _this.$store.dispatch("User/registerAccount", {
      //     register: _this.register,
      //     Router: _this.$router,
      //     Toast: _this.$toast,
      //   });
      // } else {
      //   this.$notify("请输入完整昵称和学号");
      // }
    },
    goBack() {
      this.$router.push("/user/login");
    },
  },
  created() {},
  components: {
    [NavBar.name]: NavBar,
  },
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

.greydispaly {
  // input::-webkit-input-placeholder {
  //   color: #017cffb6;
  // }
  // input:-moz-placeholder {
  //   color: #fff;
  // }
  // input::-moz-placeholder {
  //   color: #fff;
  // }
  // input:-ms-input-placeholder {
  //   color: #fff;
  // }
}

.greydispaly + div {
  // background: #00f;
}
</style>


