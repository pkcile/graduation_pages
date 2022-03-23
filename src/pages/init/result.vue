<!--
 * @Author: 王朋坤
 * @Date: 2022-03-18 08:15:01
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-23 15:27:29
 * @FilePath: /graduation-project-master/src/pages/init/result.vue
 * @Description: 
-->

<template>
  <Transition name="modal">
    <div v-if="showResulet" class="modal-mask">
      <van-nav-bar
        class="header"
        title="结果页面"
        left-arrow
        @click-left="closeclose"
      />
      <ul class="main-information" style="color: #555555">
        <ul
          style="
            padding: 10px 15px;
            color: #555555;
            border-bottom: 1px solid #efeff3;
            background: #fff;
          "
        >
          用户信息
        </ul>
        <ul
          class="mine-form-display-infor"
          style="padding: 0 0 15px 0; margin: 0; color: #444"
        >
          <li>
            <span>{{ "姓名" }}</span>
            <span>
              {{pageData.signResult.information.name}}
            </span>
          </li>
          <li>
            <span @click="changesize">{{ "任务状态" }}</span>
            <span
            style="position: relative"
            >
             {{pageData.signResult.sign.infor}}
              <span
                :style="{
                  position: 'absolute',
                  width: '80px',
                  height: '0',
                  bottom: '5px',
                  background: '#bfa',
                  'border-bottom': '1px dotted blue',
                }"
              ></span>
            </span>
          </li>
        </ul>

        <ul
          style="
            padding: 10px 15px;
            color: #555555;
            border-bottom: 1px solid #efeff3;
            background: #fff;
          "
        >
          附加信息
        </ul>
        <ul
          class="mine-form-display-infor"
          style="margin: 0; color: #555555; color: #444"
        >
          <!-- <li>
            <span>{{ "近期任务" }}</span>
            <span>{{ "0个打卡任务" }}</span>
          </li> -->
        </ul>
      </ul>

      <!-- 注册按钮 -->
      <div
        class="mine-button-block"
        style="margin-top: 18px; position: sticky; bottom: 20px; left: 0"
        @click="closeclose"
      >
        {{ pageData.register.title }}
      </div>
    </div>
  </Transition>
</template>

<script>
import { NavBar } from "vant";
import { flatearthDistance } from "@/utils/distance2.js";
import axios from "axios";
import eventbus from "@/utils/evenbus.js"

export default {
  props: {
    show: Boolean,
  },
  name: "modal",
  data() {
    return {
      pageData: {
        register: {
          title: "返回",
        },
        signResult: {
          information: {
            name: "guest"
          },
          sign: {
            infor: "打卡结果"
          },
          future: {

          }
        }
      },
      returnData: {

      },
      showResulet: this.show,
    };
  },
  methods: {
    closeclose() {
      this.showResulet = false;
    },
    openopen(data01, aaa) {
      // 快捷登陆结果，解析
      
      setTimeout(() => {
        this.showResulet = true;
      }, 0);

      const data = {
        geometry: { latitude: 23.132103, longitude: 113.383381 },
        tasks: {
          result: {
            userinformation: {
              username: "1",
              password: "1234",
              name: "管理员1号",
              studynth: "1",
              register: "2022-03-18 07:25:08",
              registertimestamp: 1647559508896,
              logintimestamp: 1647559508896,
              imglink:
                "https://portrait.gitee.com/uploads/avatars/user/2511/7534207_pkcile_1616390370.png!avatar200",
              showinfor: "默认签名",
              role: "管理员",
            },
            tasks: [
              {
                id: 225,
                placesmark: false,
                wifismark: false,
                classnamesmark: false,
                timesmark: false,
                topic: "暑假打卡主题",
                createstamp: 1647619349211,
                createuser: "pkcile",
                Places: [
                  {
                    taskid: 225,
                    placesnth: 47,
                    servermark: true,
                    serverplacename: "地点",
                    geometrymark: false,
                    geometry: {
                      type: "Point",
                      coordinates: [-76.984722, 39.807222],
                    },
                    radius: 100,
                    createstamp: 1647619349205,
                    taskId: 225,
                  },
                ],
                Classnames: [{ classname: "admin", taskId: 225 }],
                Wifis: [],
                Results: [
                  {
                    taskid: 225,
                    startstamp: 1647659664862,
                    studynth: "1",
                    statusmark: 0,
                    status: "任务分发初始化",
                    previousstamp: 2000000,
                    afterstamp: 1800000,
                    taskId: 225,
                  },
                ],
              },
            ],
          },
          status: { mark: 1, infor: "登陆成功" },
        },
        placeinformation: [
          { key: "地址", value: "广州市天河区棠东富华新街二巷" },
        ],
      };

      console.log(data, data01);
      this.taskJudge(data01);
    },
    taskJudge(data) {
      const _this = this;
      
      class TaskDealWith {
        initData;
        forminitData;
        singlestamptaskArray;
        wifijudgemark;
        timejudgemark;
        geometryjudgemark;

        constructor(data) {
          this.initData = data;
          this.forminitData = data;
        }

        forminit() {
          // 一维数组
          const singlestamptaskArray = [
          ];
          console.log(this.forminitData);
          const { tasks, geometry, placeinformation, wifis } =
            this.forminitData;

          tasks.result.tasks.forEach((taskitem) => {
            taskitem.Results.forEach((taskitemperson) => {
              singlestamptaskArray.push({
                id: taskitem.id,
                topic: taskitem.topic,
                Wifis: taskitem.Wifis,
                Places: taskitem.Places,
                key: Date.now(),
                startstamp: taskitemperson.startstamp,
                beginstamp:
                  taskitemperson.startstamp - taskitemperson.previousstamp,
                endstamp: taskitemperson.startstamp + taskitemperson.afterstamp,
                status: taskitemperson.status,
                statusmark: taskitemperson.statusmark,
                studynth: taskitemperson.studynth,
                geometry: {
                  type: "Point",
                  coordinates: [geometry?.longitude, geometry?.latitude],
                },
                userwifimark: 0,
                userplacemark: 0,
                usertimemark: 0,
              });
            });
          });

          this.singlestamptaskArray = singlestamptaskArray;

          console.log(this.singlestamptaskArray);

          return this;
        }

        wifijudge() {
          this.wifijudge = 1;
        }

        geometryjudge() {
          const singlestamptaskArray = this.singlestamptaskArray;
          const { geometry } = this.forminitData;

          singlestamptaskArray.map((singlestamptaskArrayitem) => {
            singlestamptaskArrayitem.Places.forEach((placesitem) => {
              let distance = flatearthDistance(
                {
                  latitude: geometry?.latitude,
                  longitude: geometry?.longitude,
                },
                {
                  latitude: placesitem.geometry.coordinates[1],
                  longitude: placesitem.geometry.coordinates[0],
                }
              );
              if (distance < placesitem.radius) {
                singlestamptaskArrayitem.userplacemark += 1;
              } else {
                console.log("距离过大");
              }
            });
          });

          console.log(singlestamptaskArray);

          this.geometryjudgemark = 1;
          return this;
        }

        timejudge() {
          this.singlestamptaskArray.map((singlestamptaskArrayitem) => {
            if (Date.now() > singlestamptaskArrayitem) {
              // 迟到了
              singlestamptaskArrayitem.usertimemark = -1;
            } else {
              // 打卡正常
              singlestamptaskArrayitem.usertimemark = 1;
            }
          });

          this.timejudgemark = 1;
          return this;
        }

        updateresult() {
          const _this = this;
          return new Promise((resolve) => {
            const wifijudgemark = this.wifijudgemark;
            const timejudgemark = this.timejudgemark;
            const geometryjudgemark = this.geometryjudgemark;

            this.singlestamptaskArray.map((singlestamptaskArrayitem) => {
              // 只使用位置、时间来显示打卡情况
              if (timejudgemark && geometryjudgemark && !wifijudgemark) {
                console.log(
                  singlestamptaskArrayitem.userplacemark,
                  singlestamptaskArrayitem.usertimemark
                );
                if (
                  singlestamptaskArrayitem.usertimemark == 1 &&
                  singlestamptaskArrayitem.userplacemark > 0
                ) {
                  singlestamptaskArrayitem.statusmark = 1;
                  singlestamptaskArrayitem.status = "打卡成功";
                } else if (
                  singlestamptaskArrayitem.usertimemark == -1 &&
                  singlestamptaskArrayitem.userplacemark > 0
                ) {
                  singlestamptaskArrayitem.statusmark = -1;
                  singlestamptaskArrayitem.status = "迟到了";
                } else if (
                  singlestamptaskArrayitem.usertimemark == -1 &&
                  singlestamptaskArrayitem.userplacemark == 0
                ) {
                  singlestamptaskArrayitem.statusmark = -1;
                  singlestamptaskArrayitem.status = "迟到了，位置判断失败";
                } else if (
                  singlestamptaskArrayitem.usertimemark == 1 &&
                  singlestamptaskArrayitem.userplacemark == 0
                ) {
                  singlestamptaskArrayitem.statusmark = -1;
                  singlestamptaskArrayitem.status = "位置判断失败";
                }
              } else {
              }
            });

            const singlestamptaskArraySend = [];

            this.singlestamptaskArray.forEach((singlestamptaskArrayitem) => {
              console.log(singlestamptaskArrayitem.geometry);
              singlestamptaskArraySend.push({
                geometry: singlestamptaskArrayitem.geometry,
                taskid: singlestamptaskArrayitem.id,
                studynth: singlestamptaskArrayitem.studynth,
                startstamp: singlestamptaskArrayitem.startstamp,
                topic: singlestamptaskArrayitem.topic,
                status: singlestamptaskArrayitem.status,
                statusmark: singlestamptaskArrayitem.statusmark,
                userplacemark: singlestamptaskArrayitem.userplacemark,
                usertimemark: singlestamptaskArrayitem.usertimemark,
                userwifimark: singlestamptaskArrayitem.userwifimark,
              });
            });

            console.log(singlestamptaskArraySend);

            axios
              .get(`${process.env.VUE_APP_POSITION_PATH}/result/taskSign`, {
                params: { sendArray: singlestamptaskArraySend },
              })
              .then((returnData) => {
                // 
                let signResult = {
                  result: null,
                  status: {
                    mark: 0,
                    info: "无打卡任务"
                  }
                }
                // 无打卡任务
                // 有打卡任务，打卡任务，单个任务打卡、多个任务打卡成功
                if(singlestamptaskArraySend.length == 0) {
                  signResult = {
                    result: null,
                    status: {
                      mark: 0,
                      infor: "无打卡任务"
                    }
                  }
                }
                else if(singlestamptaskArraySend.length == 1){
                  signResult = {
                    result: returnData.data.result,
                    status: {
                      mark: returnData.data.status.mark,
                      infor: returnData.data.status.infor
                    }
                  }
                }
                else {
                  signResult = {
                    result: returnData.data.result,
                    status: {
                      mark: 2,
                      infor: "多个任务提交完成"
                    }
                  }
                }

                resolve({
                  signResult: signResult,
                  signJudge: _this.singlestamptaskArray,
                  signInit: _this.forminitData,
                });
              });

            return this;
          });
        }

        showresult() {
          return this;
        }
      }

      const task = new TaskDealWith(data);


      task
        .forminit()
        .geometryjudge()
        .timejudge()
        .updateresult()
        .then((returnData) => {
          console.log(returnData);
          _this.returnData = returnData;
          _this.pageData.signResult.information.name = returnData.signInit.tasks.result.userinformation.name;
          _this.pageData.signResult.sign.infor = returnData.signResult.status.infor;
          // this.pageData
        });

              // return;
    },
    changesize(){

      eventbus.$emit('add',this.arg)
      this.$router.push("/home");
    }

  },
  mounted() {
    const data = {
      geometry: { latitude: 23.132103, longitude: 113.383381 },
      tasks: {
        result: {
          userinformation: {
            username: "1",
            password: "1234",
            name: "管理员1号",
            studynth: "1",
            register: "2022-03-18 07:25:08",
            registertimestamp: 1647559508896,
            logintimestamp: 1647559508896,
            imglink:
              "https://portrait.gitee.com/uploads/avatars/user/2511/7534207_pkcile_1616390370.png!avatar200",
            showinfor: "默认签名",
            role: "管理员",
          },
          tasks: [
            {
              id: 225,
              placesmark: false,
              wifismark: false,
              timesmark: false,
              classnamesmark: false,
              topic: "暑假打卡主题",
              createstamp: 1647619349211,
              createuser: "pkcile",
              Places: [
                {
                  taskid: 225,
                  placesnth: 47,
                  servermark: true,
                  serverplacename: "地点",
                  geometrymark: false,
                  geometry: {
                    type: "Point",
                    coordinates: [-76.984722, 39.807222],
                  },
                  radius: 100,
                  createstamp: 1647619349205,
                  taskId: 225,
                },
              ],
              Classnames: [{ classname: "admin", taskId: 225 }],
              Wifis: [],
              Results: [
                {
                  taskid: 225,
                  startstamp: 1647659664862,
                  studynth: "1",
                  statusmark: 0,
                  status: "任务分发初始化",
                  previousstamp: 2000000,
                  afterstamp: 1800000,
                  taskId: 225,
                },
              ],
            },
          ],
        },
        status: { mark: 1, infor: "登陆成功" },
      },
      placeinformation: [
        { key: "地址", value: "广州市天河区棠东富华新街二巷" },
      ],
    };

    // console.log(data);
  },
  destroyed() {
    console.log('该组件可销毁 result');
  },
  components: {
    [NavBar.name]: NavBar,
  },
};
</script>


<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: #efeff3;
  transition: all 0.1s ease-in;
  .main-information {
    overflow-y: auto;
    width: 100%;
    height: calc(100% - 56px);
  }
}

.modal-enter-from {
  opacity: 1;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>