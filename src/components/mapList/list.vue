<!--
 * @Author: 王朋坤
 * @Date: 2022-04-24 09:45:27
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-24 17:39:55
 * @FilePath: /graduation-project-master/src/components/mapList/list.vue
 * @Description: 
-->

<template>
  <div
    class="mine-send-part-absolute personDataSend"
    style="position: fixed; width: 100%; height: 100%; top: 0px; z-index: 100"
    v-bind:class="{ 'send-part-control': true }"
  >
    <mapview v-show="mapviewControl" ref="startmapview"> </mapview>
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
        <li>
          <span>打卡主题</span>
          <span>{{ tasklistsSelectItem.taskinfor.topic }}</span>
        </li>
        <li>
          <span>设置时间</span>
          <span>{{ convertDate(tasklistsSelectItem.startstamp) }}</span>
        </li>
        <li>
          <span>创建人员</span>
          <span>{{ tasklistsSelectItem.taskinfor.createuser }}</span>
        </li>
        <li>
          <span>打卡地点</span>
          <span>{{ tasklistsSelectItem.taskinfor.serverplacename ? tasklistsSelectItem.taskinfor.serverplacename: "整个服务" }}</span>
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
        </li>
        <li style="background: #efeff3"><span>备注</span></li>
        <li>
          <span style="color: #999; font-size: 14px">{{tasklistsSelectItem.comment ? tasklistsSelectItem.comment : "备注信息为空" }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { convertDate } from "@/utils/date.js";
import axios from "axios";
import mapview from "./map.vue";
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
import { getResultClockLogItem } from "@/api/mine/index.js";

export default {
  name: "indexmodal",
  data() {
    return {
      mapviewControl: false,
      sendStudentData: [],
      taskId: null,
      singletask: {
        comment: "",
      },
      tasklistsSelectItem: {
        taskid: 225,
        studynth: "1",
        startstamp: 1647659664862,
        previousstamp: 2000000,
        afterstamp: 1800000,
        status: "未迟到，位置判断失败",
        statusmark: -1,
        userwifimark: 0,
        userplacemark: 0,
        usertimemark: 1,
        geometry: {
          type: "Point",
          coordinates: [-76.984722, 39.807222],
        },
        comment: "",
        taskId: 225,
        taskinfor: {
          topic: "暑假打卡主题",
          createstamp: 1647619349211,
          createuser: "pkcile",
          serverplacename: null,
        },
        setgeometry: [
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
      },
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
      this.$parent.listcomponentControl = false;
      // console.log(this.$parent.logcomponentControl);
    },
    convertDate,
    mapviewJudge() {
      const tasklistsSelectItem = this.tasklistsSelectItem;
      this.mapviewControl = true;
      this.$refs["startmapview"].startmapview({
        tasklistsSelectItem
      });
    },
    listcomponentRefFun(params) {
      console.log(params);
      getResultClockLogItem(params).then(returnData => {
        console.log(returnData);
        if(returnData?.data?.result) {
          this.tasklistsSelectItem = returnData.data.result;
        }
        else {
          this.$toast("查询错误");
        }
      })
      this.$parent.listcomponentControl = true;

    },
    ...mapMutations("User", [
      "updateStatus",
      "wifiStore",
      "geometryStore",
      "taskSignResultStore",
    ]),
  },
  created() {},
  mounted() {
    this.$parent.pageResult = false;
  },
};
</script>

<style lang="scss">
</style>