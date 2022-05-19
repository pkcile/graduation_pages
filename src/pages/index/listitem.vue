<!--
 * @Author: 王朋坤
 * @Date: 2022-03-26 15:57:41
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-19 09:18:17
 * @FilePath: /graduation-project-master/src/pages/index/listitem.vue
 * @Description: 
-->

<template>
  <div
    class="mine-send-part-absolute personDataSend"
    style="
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0px;
      z-index: 100;
    "
    v-bind:class="{ 'send-part-control': true }"
  >
  <transition name="component-fade" mode="out-in">
       <mapview v-show="mapviewControl" ref="startmapview"> </mapview>
  </transition>
    <div class="send-title" style="height: 50px; line-height: 50px">
      打卡窗口
      <div
        class="send-control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
    </div>
    <div class="send-main" style="height: calc(100% - 50px); overflow-y: auto">
      <!-- 表单 -->
      <ul class="mine-form-display" style="">
        <li @click="judgetopic">
          <span>打卡主题</span>
          <span>{{ tasklistsSelectItem.topic }}</span>
          <span style="flex: 0 0 50px" class="hidecontrol"
            ><van-icon name="arrow-down"
          /></span>
        </li>
        <li v-show="judgetopicserveral">
          <span>开始时间</span>
          <span>{{ convertDate(tasklistsSelectItem.beginstamp) }}</span>
        </li>
        <li v-show="judgetopicserveral">
          <span>结束时间</span>
          <span>{{ convertDate(tasklistsSelectItem.endstamp) }}</span>
        </li>
        <li v-show="judgetopicserveral">
          <span>创建人员</span>
          <span>{{ tasklistsSelectItem.createuser }}</span>
        </li>
        <li @click="mapviewJudge">
          <span>打卡状态</span>
          <span style="position: relative"
            >{{ tasklistsSelectItem.status }}
            <span
              :style="{
                position: 'absolute',
                width: '60px',
                height: '0',
                bottom: '-4px',
                left: 0,
                background: '#bfa',
                'border-bottom': '1px dotted blue',
              }"
            ></span>
          </span>
          <span style="flex: 0 0 50px" @click="judgestatus" class="hidecontrol"
            ><van-icon name="arrow-down"
          /></span>
        </li>
        <li v-show="judgestatusserveral">
          <span>服务判断</span>
          <span>{{
            this.tasklistsSelectItem.userplaceservermark == 1
              ? "判断成功"
              : "判断失败"
          }}</span>
        </li>
        <li v-show="judgestatusserveral">
          <span>位置判断</span>
          <span>{{
            this.tasklistsSelectItem.userplacemark == 1? "判断成功" : "判断失败"
          }}</span>
        </li>
        <li v-show="judgestatusserveral">
          <span>WIFI判断</span>
          <span>{{
            this.tasklistsSelectItem.userwifimark == 1? "判断成功" : "判断失败"
          }}</span>
        </li>
        <!-- <li>
          <span>打卡地点</span>
          <span>{{ tasklistsSelectItem.topic }}</span>
        </li> -->

        <li style="background: #efeff3"><span>备注</span></li>
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          placeholder="请详细描述你的问题和意见..."
          v-model="tasklistsSelectItem.comment"
        ></textarea>
      </ul>
      <div
        class="mine-button-block bottom-fix"
        style="position: sticky; bottom: 20px; left: 0; margin-top: 15px"
        @click="updateSingleTask"
      >
        备注信息提交更新
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from "@/utils/date.js";
import { flatearthDistance } from "@/utils/distance2.js";
import { geometry } from "@turf/helpers";
import axios from "axios";
import mapview from "./mapview.vue";
import * as turf from "@turf/turf";
import {
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  ActionSheet,
  Icon,
} from "vant";
import { mapState, mapMutations } from "vuex";
import { placeserverjudgeapi } from "@/api/index/index.js";

export default {
  name: "indexmodal",
  props: {
    tasklistsSelectItem: Object,
  },
  data() {
    return {
      mapviewControl: false,
      sendStudentData: [],
      taskId: null,
      singletask: {
        comment: "",
      },
      judgestatusserveral: false,
      judgetopicserveral: true,
      // tasklistsSelectItem: {
      //   topic: null,
      //   createuser: null,
      //   id: null,
      //   key: Date.now() + Math.random(),
      //   status: null,
      //   time: null,
      //   startstamp: null,
      //   icon: null,
      //   endstamp: null,
      //   beginstamp: null,
      //   geometry: null,
      //   Places: null,
      //   Wifis: null,
      //   studynth: null,
      //   taskid: null,
      //   comment: ""
      // }
    };
  },
  components: {
    mapview: mapview,
    [Icon.name]: Icon,
  },
  methods: {
    displayResult() {},
    sendDdata() {},
    backTo() {
      this.$parent.pageResult = false;
      // this.$emit("fun0001", "data");
    },
    tasklistsEventCall(tasklistitem) {
      this.tasklistsSelectItem.status = "打卡情况未知";
      class TaskDealWith {
        singleTask;
        geometry;
        wifi;

        constructor(data) {
          this.forminitData = data;
          this.singleTask = data.task;
          this.geometry = data.geometry;
          this.wifi = data.wifi;
          console.log(data.task);
          // console.log(data);
          this.forminit().timejudge().geometryjudge().wifijudge();
        }

        forminit() {
          // this.singleTask.userplacemark = 0;
          // this.singleTask.userwifimark = 0;
          // this.singleTask.usertimemark = 0;
          // this.singleTask.userplaceservermark = 0;
          console.log(this.singleTask);
          console.log(this.singleTask.topic, this.singleTask.userplacemark, this.singleTask.usertimemark, this.singleTask.userplaceservermark)

          return this;
        }

        wifijudge() {
          const { wifi } = this.forminitData;

          this.singleTask.Wifis = this.singleTask?.Wifis.length
            ? this.singleTask.Wifis
            : [];

          console.log(wifi);
          console.log(this.singleTask.Wifis);

          this.singleTask.Wifis.forEach((wifiitem) => {
            let findresult = wifi.find((item) => {
              console.log(item.bssid == wifiitem.bssid);
              return item.bssid == wifiitem.bssid;
            });

            this.singleTask.userwifimark = this.singleTask.userwifimark || findresult ? 1 : -1;
          });

          if(!window.plus) {
             this.singleTask.userwifimark = -1;
          }

          return this;
        }

        geometryjudge() {
          const { geometry } = this.forminitData;

          this.singleTask.Places = this.singleTask?.Places.length
            ? this.singleTask.Places
            : [];
          let findresult = this.singleTask?.Places.find((placesitem) => {
            let distance = flatearthDistance(
              {
                latitude: geometry?.coordinates[1],
                longitude: geometry?.coordinates[0],
              },
              {
                latitude: placesitem.geometry.coordinates[1],
                longitude: placesitem.geometry.coordinates[0],
              }
            );

            console.log(distance);
            return placesitem.radius > distance;
          });

          this.singleTask.userplacemark = findresult || this.singleTask.userplacemark == 1 ? 1 : -1;

          return this;
        }

        placeserverjudge() {
          return new Promise((resovle) => {
            const { geometry } = this.forminitData;
            var point = turf.point([geometry.coordinates[0], geometry.coordinates[1]]);
            // var point = turf.point([116.02497, 28.68723]);
            var buffered = turf.buffer(point, 50 / 1000.0);
            console.log(buffered);
            var geometry001 = {
              rings: buffered.geometry.coordinates,
              spatialReference: {
                wkid: 4326,
              },
            };

            placeserverjudgeapi({
              geometry: JSON.stringify(geometry001),
              geometryType: "esriGeometryPolygon",
              f: "json",
              returnGeometry: true,
            })
              .then((returnData) => {
                if(returnData.data.features.length) {
                  this.singleTask.userplaceservermark = 1;
                }
                else {
                  this.singleTask.userplaceservermark = this.singleTask.userplaceservermark ? this.singleTask.userplaceservermark : -1;
                }
                
                resovle({
                  singleTask: this.singleTask,
                  features: returnData.data?.features,
                });
              })
              .catch((data) => {
                this.singleTask.userplaceservermark = this.singleTask.userplaceservermark ? this.singleTask.userplaceservermark : -1;
    
                resovle({ singleTask: this.singleTask, features: [] });
                console.log(data);
              });
          });
        }

        timejudge() {
          console.log("时间标识" + this.singleTask.usertimemark);
          if (Date.now() <= this.singleTask.startstamp || this.singleTask.usertimemark == 1) {
            // 打卡正常
            this.singleTask.usertimemark = 1;
          } else {
            // 迟到了
            this.singleTask.usertimemark = -1;
          }

          return this;
        }
      }

      const task = new TaskDealWith({
        task: this.tasklistsSelectItem,
        wifi: this.$store.state.User.get.wifi,
        geometry: this.$store.state.User.get.geometry,
      });

      task.placeserverjudge().then((data) => {
        console.log(this.tasklistsSelectItem);
        if((this.tasklistsSelectItem.userplacemark == 1 || this.tasklistsSelectItem.userwifimark == 1 || this.tasklistsSelectItem.userplacemark == 1 || this.tasklistsSelectItem.userplaceservermark == 1)) {
          console.log("时间判断成功");
          if(this.tasklistsSelectItem.usertimemark == 1) {
            this.tasklistsSelectItem.statusmark = 1;
            this.tasklistsSelectItem.status = "打卡成功";
            this.tasklistsSelectItem.icon = "#icon-chaxun";
            this.$toast("打卡成功");
          }
          else {
            console.log(this.tasklistsSelectItem.userplacemark , this.tasklistsSelectItem.userwifimark ,this.tasklistsSelectItem.userplacemark);
            this.tasklistsSelectItem.statusmark = -1;
            this.tasklistsSelectItem.status = "迟到了";
            this.tasklistsSelectItem.icon = "#icon-bianjiputong";
            this.$toast("迟到了");
          }
        }
        else {
          this.tasklistsSelectItem.statusmark = -1;
          this.tasklistsSelectItem.status = "打卡失败"
          this.tasklistsSelectItem.icon = "#icon-bianjiputong";
          this.$toast("打卡失败");
        }

      
      // 数据库中打卡信息保存
      this.updateSingleTaskApi(this.tasklistsSelectItem).then((returnData) => {
        if (returnData.status.mark == 0) {
            this.tasklistsSelectItem.statusmark = 0;
            this.tasklistsSelectItem.status = "保存失败";
        }
         // 更新vuex vuex内存中任务信息保存
        // this.taskSignResultStore({taskid: this.tasklistsSelectItem.taskid, statusmark: this.tasklistsSelectItem.statusmark})
      });

      // 显示跳转
      // this.mapviewControl = true;
      
      setTimeout(() => {
        this.mapviewJudge(data);
      }, 1500);

      
      });
    },
    judgestatus(e) {
      console.log("作用");
      this.judgestatusserveral = !this.judgestatusserveral;
      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    },
    judgetopic(e) {
      console.log("作用222");
      this.judgetopicserveral = !this.judgetopicserveral;
      // window.event? window.event.cancelBubble = true : e.stopPropagation();
    },
    convertDate,
    deepClone(source) {
      const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) {
        // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === "object") {
            // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = this.deepClone(source[keys]);
          } else {
            // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    updateSingleTask() {
      const _this = this;
      let indexTask;
      this.$parent.pageData.tasklists.forEach((item, index) => {
        if (item.taskid == this.singletask.taskid) {
          indexTask = index;
        }
      });

      this.updateSingleTaskApi(this.singletask).then((returnData) => {
        if (returnData.status.mark == 1) {
          _this.$parent.pageData.tasklists[indexTask].status = "打卡成功";
          _this.$parent.pageData.tasklists[indexTask].icon = "#icon-bianjiputong";
        } else if (returnData.status.mark == -1) {
          _this.$parent.pageData.tasklists[indexTask].status = "已打卡";
          _this.$parent.pageData.tasklists[indexTask].icon = "#icon-bianjiputong";
          _this.singletask.status = returnData.status.infor;
        } else {
          this.$parent.pageData.tasklists[indexTask].status = "未打卡";
        }
      });
    },
    updateSingleTaskApi(singletask) {
      return new Promise((resolve) => {
        let singlestamptaskArraySend = [];
        singlestamptaskArraySend.push(singletask);
        axios
          .get(`${process.env.VUE_APP_POSITION_PATH}/result/taskSignSingle`, {
            params: { sendArray: singlestamptaskArraySend },
          })
          .then((returnData) => {
            let signResult = {
              result: null,
              status: {
                mark: 0,
                info: "保存失败",
              },
            };

            signResult.result = returnData.data.result
              ? returnData.data.result
              : signResult.result;
            signResult.status = returnData.data.status
              ? returnData.data.status
              : signResult.status;

            resolve(signResult);
          })
          .catch((data) => {
            resolve({
              result: null,
              status: {
                mark: 0,
                info: "保存失败",
              },
            })
          })
      });
    },
    mapviewJudge(features) {
      const tasklistsSelectItem = this.tasklistsSelectItem;
      this.mapviewControl = true;
      this.$refs["startmapview"].startmapview({ tasklistsSelectItem, features: features });
      
    },
    ...mapMutations("User", ["updateStatus", "wifiStore", "geometryStore", "taskSignResultStore"]),
  },
  created() {},
  mounted() {
    this.$parent.pageResult = false;
  },
};
</script>

<style lang="scss">

</style>