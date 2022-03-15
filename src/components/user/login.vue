<!--
 * @Author: your name
 * @Date: 2021-10-24 22:44:46
 * @LastEditTime: 2022-03-15 22:48:24
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/login.vue
-->

<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar class="header" title="登陆页面" />
    <!-- 内容区域 -->
    <main class="main">
      <!-- 输入框 -->
      <form style="padding-top: 15px">
        <div v-bind:key="inputItem.key" v-for="inputItem in pageData.items">
          <div class="mine-input-row">
            <label>{{ inputItem.title }}</label>
            <input
              type="text"
              :placeholder="inputItem.inputplaceholder"
              v-model="inputItem.value"
            />
          </div>
          <div class="mine-input-line"></div>
        </div>
        <!-- 匿名登陆 -->

        <van-checkbox-group
          v-model="pageData.checkboxes.result"
          style="margin-top: 25px"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in pageData.checkboxes.list"
              :key="item.key"
              :title="`${item.value}`"
              @click="toggle(index)"
              clickable
            >
              <span style="color: #f00" @click="spanclickmap"
                >{{ returnData.geometry.longitude }}
                {{ returnData.geometry.latitude }}</span
              >
              <template #right-icon>
                <van-checkbox :name="item.value" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <!-- 提示框 -->
        <ul
          class="mine-form-display-infor"
          style="color: #017afebf; margin: -5px 0"
        >
          <transition-group name="list" tag="p">
            <li v-for="item in returnData.placeinformation" :key="item.key">
              <span>{{ item.key }}</span>
              <span :class="{ redColor: item.red, blueColor: item.blue }">{{
                item.value
              }}</span>
            </li>
          </transition-group>
        </ul>
      </form>
      <!-- 登陆按钮 -->
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
import { getCurrentLocation2, getLocationInformation } from "@/utils/geolocation.js";
export default {
  data() {
    return {
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
        checkboxes: {
          list: [
            {
              key: 1,
              value: "快捷签到",
              value2: "study",
            },
          ],
          result: [],
        },
      },
      returnData: {
        geometry: {
          latitude: null,
          longitude: null,
        },
        placeinformation: [
          // {
          //   key: "结果",
          //   value: "注册成功，密码1234",
          //   blue: true,
          //   red: false,
          // },
        ],
      },
    };
  },
  methods: {
    loginIn() {
      const _this = this;
      const {studynth, password} = {
        studynth: this.pageData.items[0].value,
        password: this.pageData.items[1].value
      }
      
      if(!studynth || !password) {
        this.$notify({type: "warning", message: "请输入完整参数"});
      }
      else {
        this.loginSendData({studynth, password})
      }
    },
    loginSendData(paramsobj) {
      new Promise(resolve => {
         axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/user/login`, {
            params: {
              studynth: paramsobj.studynth,
              password: paramsobj.password
            },
          })
          .then((returnData) => {
            console.log(returnData.data);
            resolve(returnData);
          });
      });
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
      this.$refs.checkboxes[index].toggle();

      if (this.returnData.placeinformation.length) {
        this.returnData.placeinformation = [];
      }
      if (!this.pageData.checkboxes.result.length) {
        getCurrentLocation2().then((data) => {
          this.$toast.success("位置获取成功");
          console.log(data);
          this.returnData.geometry = data;
          getLocationInformation(this.returnData.geometry)
            .then(returnData => {
              console.log(returnData);

            const returnDataReference = [
              {
                key: "详细地址",
                value: returnData.data.result.formatted_address
              }
            ];

            this.returnData.placeinformation = returnDataReference;
            })
          // https://api.tianditu.gov.cn/geocoder?type=geocode&postStr=%7B%22lon%22:113.383507,%22lat%22:23.132059,%22ver%22:1%7D&tk=75f0434f240669f4a2df6359275146d2
        });
      } else {
        this.pageData.checkboxes.result = [];
        this.returnData.geometry = {
          longitude: null,
          latitude: null,
        };
      }
    },
    spanclickmap(e) {
      console.log(23223);
      e.stopPropagation();
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

.van-cell__value {
  flex: 1 1 115px;
  padding-right: 10px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate(0px);
  // translate
}

.redColor {
  // color: #f00;
}
.blueColor {
  // color: #00f;
}
</style>

