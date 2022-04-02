<!--
 * @Author: 王朋坤
 * @Date: 2021-10-24 22:44:46
 * @LastEditTime: 2022-04-02 13:28:13
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/pages/init/login.vue
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
            <!--  -->
              <span style="color: #555"  @click="spanclickmap"
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
          style="margin: -5px 0;color:#555;"
        >
        <!-- color: #017afebf;  -->
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

        <div
          v-bind:style="{
            opacity: returnData.placeinformation.length ? 0 : 1,
            color: '#017AFF',
          }"
        >
          <span @click="registerAccount">注册账号</span>
          <span>|</span>
          <span @click="forgetAccount">忘记密码</span>
        </div>
      </div>
      <button id="show-modal" @click="showModal001">Show Modal</button>
      <modal v-show="showModal" ref="showModal">
      </modal>
    </main>
    <!-- 导航 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import axios from "axios";
import { NavBar, Cell, CellGroup, Checkbox, CheckboxGroup } from "vant";
import {
  getCurrentLocation2,
  getLocationInformation,
} from "@/utils/geolocation.js";
import { mapMutations } from 'vuex'


import {
  flatearthDistance,
  acosDistance,
  haversineDistance,
  vincentyDistance
} from "@/utils/distance2.js"

import Modal from './result.vue'

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
        placeinformationformal: null,
        tasks: null
      },
      showModal: true
    };
  },
  methods: {
    loginIn() {
      const _this = this;
      const { studynth, password } = {
        studynth: this.pageData.items[0].value,
        password: this.pageData.items[1].value,
      };

      if (!studynth || !password) {
        this.$notify({ type: "warning", message: "请输入完整参数" });
                    setTimeout(()=> {
                this.$notify.clear();
              }, 1500)
        return;
      } 
      else {
        this.loginSendData({ studynth, password }).then((returnData) => {
          this.returnData.tasks = returnData;
          // 登陆成功
          const loginStoreData = {
            userinformation: returnData.data?.result?.userinformation,
            tasks: returnData.data?.result?.tasks,
            getGeometry: this.returnData.geometry,
            getGeometryInformation: this.returnData.placeinformationformal,
            getWifis: null
          }
          
          this.loginStore(loginStoreData);
          
          if(returnData.data.status.mark == 1) {   
            // 快捷登录
            if(this.returnData.geometry.latitude) {
              this.$notify({ type: "success", message: "快捷登录成功" });
              this.$refs["showModal"]?.openopen({
                geometry: _this.returnData.geometry,
                userinformation: returnData.data.result.userinformation,
                tasks: returnData.data,
                placeinformation: _this.returnData.placeinformation
              }, {aabb: 12312});
              setTimeout(()=> {
                this.$notify.clear();
              }, 1000)
            }
            // 常规登录
            else {
              this.$notify({ type: "success", message: "常规登录成功" });
              setTimeout(()=> {
                this.$router.push("/home/main");
                this.$notify.clear();
              }, 1000)
            }

          }
          else {
            this.$notify({ type: "danger", message: "账号密码错误" });
          }
        });
      }
    },
    loginSendData(paramsobj) {
      const _this = this;
      return new Promise((resolve) => {
        axios
          .get(`${process.env.VUE_APP_POSITION_PATH}/user/login`, {
            params: {
              studynth: paramsobj.studynth,
              password: paramsobj.password,
            },
          })
          .then((returnData) => {
            resolve(returnData);
          })
          .catch(() => {
            _this.$notify("服务器错误");
          })
      });
    },
    resolveLocationClock(returnData) {
      console.log(returnData.data);
      if(returnData.data.status.mark == 1) {
        if(returnData.data.result?.tasks.length) {
        // 处理定位任务
        // if(this.returnData.placeinformation.length) {
          // this.returnData.placeinformation.push({
          //   key: "任务",
          //   value: "获取了" + returnData.data.result.tasks.length + "个任务点"
          // })

          // 一维数组
          const placetaskidstamp = [
            {
              id: 1,
              topic: 1,
              startstamp: 12,
              statusmark: 1,
              status: 1,
              "Places": [
                {
                  "taskid": 220,
                  "placesnth": 42,
                  "servermark": true,
                  "serverplacename": "地点",
                  "geometrymark": false,
                  "geometry": {
                    "type": "Point",
                    "coordinates": [
                      -76.984722,
                      39.807222
                    ]
                },
                "createstamp": 1647518176544,
                "taskId": 220
                }
            ],
              wifis: [
                
              ],
              key: Date.now(),
              geometry: { type: "Point", coordinates: [-76.984722, 39.807222] },
              wifimark: 1,
              placemark: 1
            }

          ];

          returnData.data.result.tasks.forEach(taskitem => {
            taskitem.Results.forEach(taskitemperson => {
              placetaskidstamp.push({
                id: taskitem.id,
                topic: taskitem.topic,
                Wifis: taskitem.Wifis,
                Places: taskitem.Places,
                key: Date.now(),
                startstamp: taskitemperson.startstamp,
                beginstamp: taskitemperson.startstamp - taskitemperson.previousstamp,
                endstamp: taskitemperson.startstamp + taskitemperson.afterstamp,
                status: taskitemperson.status,
                statusmark: taskitemperson.statusmark,
                geometry: { type: "Point", coordinates: [-76.984722, 39.807222] },
                radius: taskitemperson.radius,
                userwifimark: 0,
                userplacemark: 0
              })
            })
          });

          placetaskidstamp.map(placetaskidstampitem => {
            placetaskidstampitem.Places.forEach(placesitem => {
              let distance = flatearthDistance({latitude: this.returnData.geometry?.latitude, longitude: this.returnData.geometry?.longitude}, {latitude: placesitem.geometry.coordinates[1], longitude: placesitem.geometry.coordinates[0]});
              // console.log(flatearthDistance({latitude: this.returnData.geometry?.latitude, longitude: this.returnData.geometry?.longitude}, {latitude: placesitem.geometry.coordinates[1], longitude: placesitem.geometry.coordinates[0]}));
              if( distance < placesitem.radius) {
                console.log("在范围内");
                placetaskidstampitem.userplacemark += 1;
                // console.log({latitude: this.returnData.geometry?.latitude, longitude: this.returnData.geometry?.longitude}, {latitude: placesitem.geometry.coordinates[1], longitude: placesitem.geometry.coordinates[0]});
              }
              else {
                console.log("距离过大");
                // console.log({latitude: this.returnData.geometry?.latitude, longitude: this.returnData.geometry?.longitude}, {latitude: placesitem.geometry.coordinates[1], longitude: placesitem.geometry.coordinates[0]});

              }
            })
          })

          
          // console.log(this.returnData.geometry);
          // console.log(flatearthDistance({latitude: this.returnData.geometry?.latitude, longitude: this.returnData.geometry?.longitude}, {latitude: 23.132137, longitude: 113.383399}));

          // 判断位置、wifi
          // 条件过滤
          let placetaskidstampfilter = placetaskidstamp.filter(placetaskidstampitem => {
            return placetaskidstampitem.userplacemark;
          })
          console.log(placetaskidstampfilter);

          // 批量更新


        }
        else {
          console.log("没有定位任务");
        }
      }
      else {

      }
      // return new Promise((resolve) => {
      //     axios
      //     .get(`${process.env.VUE_APP_POSITION_PATH}/user/login`, {
      //       params: {
      //         studynth: paramsobj.studynth,
      //         password: paramsobj.password,
      //       },
      //     })
      //     .then((returnData) => {
      //       resolve(returnData);
      //     });
      // });
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
        this.$toast.loading({
        message: '加载中...',
          forbidClick: true,
          duration: 0
        });

        getCurrentLocation2().then((data) => {
          this.$toast.clear();
          this.$toast.success("位置获取成功");
          console.log(data);
          this.returnData.geometry = data;

          console.log(this.returnData.geometry);
          getLocationInformation(this.returnData.geometry).then(
            (returnData) => {
              const returnDataReference = [
                {
                  key: "地址",
                  value: returnData.data.result.formatted_address,
                }
              ];

              this.returnData.placeinformation = returnDataReference;
              this.returnData.placeinformationformal = returnData;
            }
          );
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
    showModal001() {
      console.log("show show");
      this.$refs["showModal"]?.openopen();
      // console.log("show model 001");
    },
     ...mapMutations('User', [
      'loginStore'
    ]),
    // ...mapMutations('User', {
    //   loginStore2: 'loginStore' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    // })
  },
  created() {},
  components: {
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    Modal: Modal
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
  // transform: translate(100px);
  // translate
}

.redColor {
  // color: #f00;
}
.blueColor {
  // color: #00f;
}
</style>

