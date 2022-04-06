<!--
 * @Author: 王朋坤
 * @Date: 2022-03-26 15:57:41
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-06 13:53:42
 * @FilePath: /graduation-project-master/src/pages/index/result.vue
 * @Description: 
-->

<template>
  <div
    class=""
    style="
      position: fixed;
      width: 100%;
      height: 100%;
      background: #efeff3;
      top: 0px;
      z-index: 100;
    "
    v-bind:class="{ 'send-part-control': true }"
  >
    <mapview> </mapview>
    <div class="send-title">
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
        <li>
          <span>打卡主题</span>
          <span>{{ tasklistsSelectItem.topic }}</span>
        </li>
        <li>
          <span>开始时间</span>
          <span>{{ convertDate(tasklistsSelectItem.beginstamp) }}</span>
        </li>
        <li>
          <span>结束时间</span>
          <span>{{ convertDate(tasklistsSelectItem.endstamp) }}</span>
        </li>
        <li>
          <span>创建人员</span>
          <span>{{ tasklistsSelectItem.createuser }}</span>
        </li>
        <li>
          <span>判断状态</span>
          <span style="position: relative"
            >{{
              tasklistsSelectItem.status +
              "，" +
              (singletask ? singletask.status : "")
            }}
            <span
              :style="{
                position: 'absolute',
                width: '150px',
                height: '0',
                bottom: '-4px',
                left: 0,
                background: '#bfa',
                'border-bottom': '1px dotted blue',
              }"
            ></span>
          </span>
        </li>
        <!-- <li>
          <span>打卡地点</span>
          <span>{{ tasklistsSelectItem.topic }}</span>
        </li> -->
        <!-- <li>
          <span>签到误差</span>
          <span>{{ tasklistsSelectItem.geometry ? tasklistsSelectItem.geometry.accuracy + "米" : "" }}</span>
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
        打卡/更新
      </div>
    </div>

  </div>
</template>

<script>
import { convertDate } from "@/utils/date.js";
import { flatearthDistance } from "@/utils/distance2.js";
import { geometry } from "@turf/helpers";
import axios from "axios";
import mapview from './mapview.vue'

export default {
  name: "indexmodal",
  props: {
    tasklistsSelectItem: Object,
  },
  data() {
    return {
      sendStudentData: [],
      taskId: null,
      singletask: {
        comment: ""
      },
    };
  },
  components: {
    mapview: mapview
  },
  methods: {
    displayResult() {},
    sendDdata() {},
    backTo() {
      this.$parent.pageResult = false;
      // this.$emit("fun0001", "data");
    },
    tasklistsEventCall(tasklistitem) {
      class TaskDealWith {
        forminitData;
        singlestamptaskArray;
        wifijudgemark;
        timejudgemark;
        geometryjudgemark;

        constructor(data) {
          this.forminitData = data;
          this.singlestamptaskArray = data.tasks;
        }

        forminit() {
          this.singlestamptaskArray.map((taskitem) => {
            taskitem.userplacemark = 0;
            taskitem.userwifimark = 0;
            taskitem.usertimemark = 0;
          });

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
                singlestamptaskArrayitem.userplacemark = 1;
              } else {
                if (singlestamptaskArrayitem.userplacemark != 1) {
                  singlestamptaskArrayitem.userplacemark = -1;
                }
              }
            });
          });

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
          const wifijudgemark = this.wifijudgemark;
          const timejudgemark = this.timejudgemark;
          const geometryjudgemark = this.geometryjudgemark;

          this.singlestamptaskArray.map((singlestamptaskArrayitem) => {
            // 只使用位置、时间来显示打卡情况
            if (timejudgemark && geometryjudgemark && !wifijudgemark) {
              if (
                singlestamptaskArrayitem.usertimemark == 1 &&
                singlestamptaskArrayitem.userplacemark > 0
              ) {
                singlestamptaskArrayitem.statusmark = 1;
                singlestamptaskArrayitem.status = "判断成功";
              } else if (
                singlestamptaskArrayitem.usertimemark == -1 &&
                singlestamptaskArrayitem.userplacemark > 0
              ) {
                singlestamptaskArrayitem.statusmark = -1;
                singlestamptaskArrayitem.status = "迟到了";
              } else if (
                singlestamptaskArrayitem.usertimemark == -1 &&
                singlestamptaskArrayitem.userplacemark == -1
              ) {
                singlestamptaskArrayitem.statusmark = -1;
                singlestamptaskArrayitem.status = "迟到了，位置判断失败";
              } else if (
                singlestamptaskArrayitem.usertimemark == 1 &&
                singlestamptaskArrayitem.userplacemark == -1
              ) {
                singlestamptaskArrayitem.statusmark = -1;
                singlestamptaskArrayitem.status = "位置判断失败";
              }
            } else {
            }
          });

          return this;
        }

        showresult() {
          return this;
        }
      }

      const task = new TaskDealWith({
        tasks: [this.deepClone(this.tasklistsSelectItem)],
        geometry: {
          longitude: tasklistitem.geometry.coordinates[0],
          latitude: tasklistitem.geometry.coordinates[1],
        },
      });

      this.singletask = task
        .forminit()
        .geometryjudge()
        .timejudge()
        .updateresult().singlestamptaskArray[0];
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
        if(item.taskid == this.singletask.taskid) {
          indexTask =  index;
        }
      });
      
      this.updateSingleTaskApi(this.singletask)
        .then((returnData) => {
          if(returnData.status.mark == 1) {
            _this.$parent.pageData.tasklists[indexTask].status = "打卡成功"
          }
          else if(returnData.status.mark == -1) {
            _this.$parent.pageData.tasklists[indexTask].status = "已打卡";
            _this.$parent.pageData.tasklists[indexTask].icon = "#icon-bianjiputong";
            _this.singletask.status = returnData.status.infor;
          }
          else {
            this.$parent.pageData.tasklists[indexTask].status = "未打卡";
          }
        })
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
                info: "无打卡任务",
              },
            };

            signResult.result = returnData.data.result ? returnData.data.result : signResult.result;
            signResult.status = returnData.data.status ? returnData.data.status : signResult.status;

            resolve(signResult);
          });
      });
    },
  },
  created() {},
  mounted() {
    this.$parent.pageResult = true;
  },
};
</script>

<style lang="scss">
</style>