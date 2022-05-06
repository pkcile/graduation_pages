<!--
 * @Author: 王朋坤
 * @Date: 2022-05-06 09:18:08
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-06 17:49:59
 * @FilePath: /graduation-project-master/src/pages/usercontrol/useredit.vue
 * @Description: 
-->
<template>
  <div
    class="mine-send-part-absolute personDataSend"
    style="position: fixed; width: 100%; height: 100%; top: 0px; z-index: 100"
    v-bind:class="{ 'send-part-control': true }"
  >
    <!-- <mapview v-show="mapviewControl" ref="startmapview"> </mapview> -->
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
      <ul class="" style="">
        <li class="mine-single-line-three-002">
          <div>{{ "学号" }}</div>
          <div>{{ personitemData.studynth }}</div>
          <!-- <div><van-icon name="arrow" /></div> -->
        </li>
        <li class="mine-input-row-edit">
          <label>{{ "姓名" }}</label>
          <input type="text" :placeholder="personitemData.name" :value="personitemData.name" />
        </li>
        <li class="mine-single-line-three-002" @click="actionSheet.classroom.display=true">
          <div>{{ "班级" }}</div>
          <div>{{ personitemData.classroom }}</div>
          <div><van-icon name="arrow" /></div>
        </li>
        <li class="mine-single-line-three-002" @click="actionSheet.role.display=true"> 
          <div>{{ "身份" }}</div>
          <div>{{ personitemData.role }}</div>
          <div><van-icon name="arrow" /></div>
        </li>
        <van-action-sheet
          v-model="actionSheet.classroom.display"
          :actions="actionSheet.classroom.data"
          @select="changeclass"
        />
        <van-action-sheet
          v-model="actionSheet.role.display"
          :actions="actionSheet.role.data"
          @select="changerole"
        />
      </ul>
      <div
        class="mine-button-block bottom-fix"
        style="position: sticky; bottom: 20px; left: 0; margin-top: 15px"
      >
        更新修改
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from "@/utils/date.js";
import axios from "axios";
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
      actionSheet: {
        classroom: {
          display: false,
          data: [
            { name: "18级地理信息科学1班" }, 
            { name: "18级地理信息科学2班" },
            { name: "18级003班" }, 
            { name: "18级004班" },
            { name: "18级004班" },
            { name: "18级004班" },
            { name: "18级004班" },
            ],
        },
        role: {
          display: false,
          data: [
            { name: "管理员" }, 
            { name: "学生" }, 
            ],
        },
      },
      personitemData: {
        studynth: "201824803050",
        role: "管理员",
        classroom: "18级地理信息科学2班",
        name: "王朋坤",

      }
    };
  },
  components: {
    // mapview: mapview,
    [Icon.name]: Icon,
    [ActionSheet.name]: ActionSheet,
  },
  methods: {
    displayResult() {},
    sendDdata() {},
    backTo() {
      this.$parent.usereditcomponentControl = false;
      // console.log(this.$parent.logcomponentControl);
    },
    convertDate,
    mapviewJudge() {
      const tasklistsSelectItem = this.tasklistsSelectItem;
      this.mapviewControl = true;
      this.$refs["startmapview"].startmapview({
        tasklistsSelectItem,
      });
    },
    changeclass(data) {
      console.log("改变班级", data.name);
      this.actionSheet.classroom.display = false;
      this.personitemData.classroom = data.name;
      
    },
    changerole(data) {
      console.log("改变班级",data.name);
      this.actionSheet.role.display = false;
      this.personitemData.role = data.name;
    },
    listcomponentRefFun(params) {
      console.log(params);
      getResultClockLogItem(params).then((returnData) => {
        console.log(returnData);
        if (returnData?.data?.result) {
          this.tasklistsSelectItem = returnData.data.result;
        } else {
          this.$toast("查询错误");
        }
      });
      this.$parent.listcomponentControl = true;
    },
    usereditcomponentRefFun(params) {
      this.$parent.usereditcomponentControl = true;
      console.log(params);
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
/* 输入框 */
.mine-input-row-edit {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  // padding: 15px;
  padding: 10px 8px;
  background: #fff;
  border-bottom: 1px solid #8080802e;
  label {
    flex: 0 0 100px;
    display: flex;
    padding-left: 10px;
    color: #444;
  }
  input {
    flex: 1 1 80px;
    display: flex;
    color: #888;
  }
}

/* 单行三个元素 */
.mine-single-line-three-002 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #8080802e;
  padding: 10px 8px;
  cursor: pointer;
  background: #fff;
  & > div:nth-of-type(1) {
    flex: 0 0 100px;
    padding-left: 10px;
    color: #444;
  }
  & > div:nth-of-type(2) {
    flex: 1 0 100px;
    color: #444;
    // color: #aaa;
    text-align: left;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #444;
  }
}

.mine-single-line-three-002:active {
  background-color: rgba(238, 238, 238, 0.377);
  transition: all 300ms;

  & > div:nth-of-type(2) {
    flex: 1 100px;
    // color: #007aff;
    text-align: left;
  }
}
</style>