<!--
 * @Author: your name
 * @Date: 2021-10-25 23:08:53
 * @LastEditTime: 2022-03-15 14:59:04
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
          <ul class="mine-form-display-infor" style="color: #017afebf">
            <transition-group name="list" tag="p">
              <li v-for="item in returnData" :key="item.key">
                <span>{{ item.key }}</span>
                <span :class="{redColor: item.red, blueColor: item.blue}">{{ item.value }}</span>
              </li>
            </transition-group>
          </ul>

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
import { convertDate } from "@/utils/date.js";

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
        ],
        register: {
          title: "注册",
        },
      },
      returnData: [],
    };
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    returnData: function (newQuestion, oldQuestion) {
      console.log("真听");
      console.log(this.returnData);
    }
  },
  methods: {
    userRegister() {
      this.returnData = [];

      const params = {
        studynth: this.pageData.items[0].value,
      };

      if (!params.studynth) {
        this.$notify({ type: "warning", message: "请输入学号" });
      } else {
        this.userRegisterRequest(params).then((returnData) => {
          console.log(returnData);
          if (returnData.data.status == 1) {
            // 成功提示
            this.$notify({
              type: "success",
              message: returnData.data.status.infor + "密码：1234",
            });
            console.log(returnData.data.result);

            this.returnData = [
              {
                key: "结果",
                value: "注册成功，密码1234",
                // blue: true,
                // red: false
              },
              {
                key: "姓名",
                value: returnData.data.result?.name,
              },
              {
                key: "身份",
                value: returnData.data.result?.role,
              },
              {
                key: "注册时间",
                value: returnData.data.result?.registertimestamp
                  ? convertDate(returnData.data.result?.registertimestamp)
                  : returnData.data.result?.registertimestamp,
              },
            ];

            // this.returnData[0].red = true;

            this.returnData = this.returnData.filter((item) => item.value);
          
            console.log(this.returnData);
          } 
          else {
            // 错误提示
            this.$notify({
              type: "danger",
              message: returnData.data.status.infor,
            });
            console.log(returnData.data.result);
            // 结果 status.infor
            // 姓名 result.name
            // 注册时间 result.registertimestamp
            // 身份 result.role

            this.returnData = [
              {
                key: "结果",
                value: returnData.data.status.infor,
                red: true,
                blue: false
              },
              {
                key: "姓名",
                value: returnData.data.result?.name,
              },
              {
                key: "身份",
                value: returnData.data.result?.role,
              },
              {
                key: "注册时间",
                value: returnData.data.result?.registertimestamp
                  ? convertDate(returnData.data.result?.registertimestamp)
                  : returnData.data.result?.registertimestamp,
              },
            ];
            this.returnData = this.returnData.filter((item) => item.value);
            console.log(this.returnData);
            console.log(convertDate(undefined));
          }
        });
      }
    },
    userRegisterParams() {
      return {
        studynth: this.pageData.items[0].value,
      };
    },
    userRegisterRequest(paramsobj) {
      return new Promise((resolve) => {
        axios
          .get(`${process.env.VUE_APP_POSITION_PATH}/user/register`, {
            params: {
              studynth: paramsobj.studynth,
            },
          })
          .then((returnData) => {
            console.log(returnData.data);
            resolve(returnData);
          });
      });
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

.mine-form-display-infor,
.mine-button-block {
  transition: 10s;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translate(0px);
  // translate
}

.redColor {
  color: #f00;
}
.blueColor {
  color: #00f;
}
</style>


