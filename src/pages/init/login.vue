<!--
 * @Author: 王朋坤
 * @Date: 2021-10-24 22:44:46
 * @LastEditTime: 2022-05-06 10:52:57
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
              :type="inputItem.type"
              :placeholder="inputItem.inputplaceholder"
              v-model="inputItem.value"
              style="padding-right: 20px;"
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
                >{{ Number(returnData.geometry.longitude).toFixed(4) != 0 ?  Number(returnData.geometry.longitude).toFixed(4) : "" }}
                {{  Number(returnData.geometry.latitude).toFixed(4) != 0 ?   Number(returnData.geometry.latitude).toFixed(4) : "" }}</span
              >
              <template #right-icon>
                <van-checkbox :name="item.value" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        
        <!-- 提示框 -->

        <ul
          class="mine-form-display-infor-edit"
          style="margin: -5px 0;color:#555;"
        >
        <!-- color: #017afebf;  -->
          <transition-group name="list" tag="p">
            <li v-for="item in returnData.placeinformation" :key="item.key">
              <span>{{ item.key }}</span>
              <span :class="{ redColor: item.red, blueColor: item.blue }" style="">{{
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
      <!-- <button id="show-modal" @click="showModal001">Show Modal</button> -->
      <modal v-show="showModal" ref="showModal">
      </modal>
    </main>
    <!-- 导航 -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Checkbox, CheckboxGroup } from "vant";
import {
  getCurrentLocation2
} from "@/utils/geolocation.js";
import { mapMutations } from 'vuex'

import { tianSearchApi, getLocationInformation } from "@/api/other/index.js"
import { loginSendDataApi } from "@/api/init/index.js"
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
            title: "昵称",
            // inputplaceholder: "用户名或学号",
            inputplaceholder: "用户昵称",
            value: "",
            type: "text"
          },
          {
            key: 2,
            title: "密码",
            // inputplaceholder: "请输入密码",
            inputplaceholder: "用户密码",
            value: "",
            type: "password"
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
        loginSendDataApi({ studynth, password }).then((returnData) => {
          if(returnData?.data) {
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
              this.$notify({ type: "success", message: "快捷登录成功", duration: "800" });
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
                this.$router.push("/home/mine");
                this.$notify.clear();
              }, 1000)
            }

          }
          else {
            this.$notify({ type: "danger", message: "账号密码错误" , duration: "800"});
          }
          }
          else {
            this.$notify({ type: "danger", message: returnData , duration: "800"});
          }
       
        });
      }
    },
    resolveLocationClock(returnData) {
      console.log(returnData.data);
      if(returnData.data.status.mark == 1) {
        if(returnData.data.result?.tasks.length) {
        // 处理定位任务
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

    },
    registerAccount() {
      window.sessionStorage.setItem("registerMark", "1");
      this.$router.push("/user/register");
    },
    forgetAccount() {
      // this.$toast("不要忘记密码，找不回来了 :)");
      this.$notify({message: "默认密码：1234", duration: "800"});
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
                  key: "位置查看",
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
  created() {
    console.log(window.sessionStorage.getItem("User"));
    if(window.sessionStorage.getItem("User")) {
      this.$router.push("/home/main")
    }
  },
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


/* 表单样式-信息2 */
.mine-form-display-infor-edit {
  cursor: pointer;
  background: #fff;
  margin: 10px 5px;
  li {
    display: flex;
    padding: 0px 15px;
    height: 50px;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #efeff3;
    & > span {
      display: flex;
      /* justify-content: flex-start; */
      align-items: center;
      height: 100%;
    }
    & > span:nth-child(1) {
      flex: 0 0 100px;
      /* background: #bfa; */
    }
    & > span:nth-child(2) {
      flex: 2 0 200px;
      // flex: 0 0 241px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      height: auto;
    }
    & > textarea {
      border-width: 0;
      width: 90%;
      padding: 10px;
    }
  }

}

.mine-form-display-infor-edit li:active {
  background-color: #eee;
}

</style>

