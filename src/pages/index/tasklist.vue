<!--
 * @Author: 王朋坤
 * @Date: 2022-03-21 15:20:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-02 14:39:07
 * @FilePath: /graduation-project-master/src/pages/index/tasklist.vue
 * @Description: 
-->
<template>
  <div style="height: 100%">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      style="height: 100%"
      success-text="刷新成功"
    >
      <!-- <p>刷新次数: {{ count }}</p> -->
      <div class="mine-form-notice">
        <van-notice-bar color="#1989fa" background="#fff" left-icon="back-top">
          打卡提示信息
        </van-notice-bar>
      </div>

      <ul class="mine-form-tasklist" style="" v-if="pageData.tasklists.length">
        <li
          v-for="taskitem in pageData.tasklists"
          v-bind:key="taskitem.key"
          @click="taskitemjump(taskitem)"
        >
          <div class="title">
            <span>{{ taskitem.status }}</span>
            <!-- <img  :src="taskitem.img" alt="" style="color: blue"> -->
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="taskitem.icon"></use>
            </svg>
          </div>
          <div class="main">
            <div>主题：{{ taskitem.topic }}</div>
            <div>时间：{{ taskitem.time }}</div>
          </div>
        </li>
      </ul>
      <ul class="" v-else style="background: #fff; width: 100%; height: 100%">
        <van-empty description="无打卡任务" />
      </ul>
      </van-pull-refresh>
      <indexmodal v-show="pageResult" @fun0001="resultClose" :tasklistsSelectItem="pageData.tasklistsSelectItem" ref="tasklistsEvent">
      </indexmodal>
  </div>
</template>

<script>
import { PullRefresh, NoticeBar } from "vant";
import { flatearthDistance } from "@/utils/distance2.js";
import axios from "axios";
import { Empty } from "vant";
import "@/assets/font/index.js";
import eventbus from "@/utils/evenbus.js";
import { mapState, mapMutations} from "vuex";
import { convertDate } from "@/utils/date.js";
import { TaskDealWith } from "@/utils/judgetasks.js";
import indexmodal from './result.vue'
import {
  getCurrentLocation2,
  getLocationInformation,
} from "@/utils/geolocation.js";

export default {
  props: {
    show: Boolean,
  },
  name: "tasklist",
  data() {
    return {
      pageData: {
        tasklists: [
          // {
          //   key: Date.now(),
          //   status: "打卡失败",
          //   img: require('@/assets/font/edit-false.svg'),
          //   createuser: "admin",
          //   time: "2022-03-21 12:00:00",
          //   topic: "暑假实习打卡",
          //   icon: "#icon-bianjiputong"
          // },
          // {
          //   key: 2,
          //   status: "打卡成功",
          //   img: require('@/assets/font/query.svg'),
          //   createuser: "admin",
          //   time: "2022-03-21 12:00:00",
          //   topic: "暑假实习打卡",
          //   icon: "#icon-chaxun"
          // },
          // {
          //   key: 3,
          //   status: "未打卡",
          //   img: require('@/assets/font/start.svg'),
          //   createuser: "admin",
          //   time: "2022-03-21 12:00:00",
          //   topic: "暑假实习打卡",
          //   icon: "#icon-kaishibofang"
          // },
        ],
        tasklistsSelectItem: {}
      },
      pageResult: false,
      returnData: {},
      showResulet: this.show,
      count: 0,
      isLoading: false,
      imgEmpoty: require("@/assets/font/empoty.svg"),
    };
  },
  methods: {
    onRefresh() {
      this.isLoading = false;
      // setTimeout(() => {
      //   // this.$toast('刷新成功');
      //   this.isLoading = false;
      //   this.count++;
      // }, 1000);
    },
    taskitemjump(jumpitem) {
      this.pageData.tasklistsSelectItem = jumpitem;
      this.$toast.loading({
        message: '位置加载中...',
        forbidClick: true,
        duration: 0
      });
      getCurrentLocation2().then(returnData => {
        this.pageData.tasklistsSelectItem.geometry = {
          coordinates: [returnData.longitude, returnData.latitude],
          type: "Point",
          accuracy: returnData.accuracy
        }
        this.$toast.clear();
        this.$toast.success('位置获取成功');
        this.pageResult = true;
        this.$refs["tasklistsEvent"].tasklistsEventCall(this.pageData.tasklistsSelectItem);
      })

    },
    judgeArrayToTasklists(judgeArray) {
      let tasklists = [];
      let icon = "#icon-kaishibofang";
      let status = "未打卡";
      judgeArray.forEach((judgetaskitem) => {
        if (judgetaskitem.statusmark === 1) {
          icon = "#icon-chaxun";
          status = "打卡成功";
        } else if (judgetaskitem.statusmark == 0) {
          icon = "#icon-kaishibofang";
          status = "未打卡";
        } else {
          icon = "#icon-bianjiputong";
          status = "已打卡";
        }
        // console.log(judgetaskitem, "judgetaskitem");
        tasklists.push({
          id: judgetaskitem.id,
          key: Date.now() + Math.random(),
          status,
          createuser: judgetaskitem.createuser,
          time: convertDate(judgetaskitem.startstamp),
          startstamp: judgetaskitem.startstamp,
          topic: judgetaskitem.topic,
          icon,
          endstamp: judgetaskitem.endstamp,
          beginstamp: judgetaskitem.beginstamp,
          geometry: judgetaskitem.geometry,
          Places: judgetaskitem.Places,
          Wifis: judgetaskitem.Wifis,
          studynth: judgetaskitem.studynth,
          taskid: judgetaskitem.id,
          comment: ""
        });
      });
      return tasklists;
    },
    tasksToJudgeArray(tasks) {
      let taskDealWith = new TaskDealWith({tasks})
      return taskDealWith.singlestamptaskArray;
    },
    resultClose() {
      this.pageResult = false;
    },
    ...mapMutations('User', [
      'oneMethod',
      'updateStatus'
    ]),
  },
  mounted() {
    // console.log(this);
     console.log(this.oneMethod);
  },
  created() {
    this.$store.commit("User/updateStatus");
    
    const User1 = {
      login: {
        userinformation: {
          username: "1",
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
            id: 243,
            placesmark: false,
            wifismark: false,
            classnamemark: false,
            timesmark: false,
            topic: "暑假打卡主题",
            createstamp: 1648134253268,
            createuser: "pkcile",
            Places: [
              {
                taskid: 243,
                placesnth: 65,
                servermark: true,
                serverplacename: "地点",
                geometrymark: false,
                geometry: {
                  type: "Point",
                  coordinates: [-76.984722, 39.807222],
                },
                radius: 100,
                createstamp: 1648134253261,
                taskId: 243,
              },
            ],
            classname: [{ classname: "admin", taskId: 243 }],
            Wifis: [],
            Results: [
              {
                taskid: 243,
                studynth: "1",
                startstamp: 1648263107707,
                previousstamp: 2000000,
                afterstamp: 1800000,
                status: "任务分发初始化",
                statusmark: 0,
                userwifimark: 0,
                userplacemark: 0,
                usertimemark: 0,
                geometry: null,
                taskId: 243,
              },
            ],
          },
        ],
        getGeometry: { latitude: 36.110565, longitude: 115.304657 },
        getGeometryInformation: {
          data: {
            result: {
              formatted_address: "邯郸市大名县王小楼村西南约88米",
              location: { lon: 115.304657, lat: 36.110565 },
              addressComponent: {
                address: "王小楼村",
                city: "邯郸市",
                county_code: "156130425",
                nation: "中国",
                poi_position: "西南",
                county: "大名县",
                city_code: "156130400",
                address_position: "西南",
                poi: "王小楼村",
                province_code: "156130000",
                province: "河北省",
                road: "束北线",
                road_distance: 2662,
                poi_distance: 78,
                address_distance: 78,
              },
            },
            msg: "ok",
            status: "0",
          },
          status: 200,
          statusText: "OK",
          headers: { "content-type": "text/html; charset=UTF-8" },
          config: {
            transitional: {
              silentJSONParsing: true,
              forcedJSONParsing: true,
              clarifyTimeoutError: false,
            },
            transformRequest: [null],
            transformResponse: [null],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            headers: { Accept: "application/json, text/plain, */*" },
            params: {
              postStr: { lon: 115.304657, lat: 36.110565, ver: 1 },
              tk: "c2eac0b552d848155c72b1d3f6aabf36",
            },
            method: "get",
            url: "https://api.tianditu.gov.cn/geocoder?type=geocode",
          },
          request: {},
        },
        getWifis: null,
      },
      taskSign: {
        judgeArray: [
          {
            id: 243,
            topic: "暑假打卡主题",
            Wifis: [],
            Places: [
              {
                taskid: 243,
                placesnth: 65,
                servermark: true,
                serverplacename: "地点",
                geometrymark: false,
                geometry: {
                  type: "Point",
                  coordinates: [-76.984722, 39.807222],
                },
                radius: 100,
                createstamp: 1648134253261,
                taskId: 243,
              },
            ],
            key: 1648263117567,
            startstamp: 1648263107707,
            beginstamp: 1648261107707,
            endstamp: 1648264907707,
            status: "位置判断失败",
            statusmark: -1,
            studynth: "1",
            geometry: { type: "Point", coordinates: [115.304657, 36.110565] },
            userwifimark: 0,
            userplacemark: 0,
            usertimemark: 1,
          },
        ],
        signResult: {
          result: [[1]],
          status: { mark: -1, infor: "位置判断失败" },
        },
      },
    };
    let User = this.$store.state.User;
    // console.log(User);
    // console.log(JSON.stringify(this.$store.state.User));
    let tasklists = [];
    let judgeArray = User.taskSign?.judgeArray;
    let tasks = User.login?.tasks;
    // 如果存在任务判断的数组
    if (!judgeArray) {
      this.pageData.tasklists = this.judgeArrayToTasklists(judgeArray);
    } 
    else if (tasks) {
      this.pageData.tasklists = this.judgeArrayToTasklists(this.tasksToJudgeArray(tasks));
    }
  },
  destroyed() {
    // console.log("该组件可销毁 tasklist");
  },
  components: {
    [PullRefresh.name]: PullRefresh,
    [NoticeBar.name]: NoticeBar,
    [Empty.name]: Empty,
    indexmodal: indexmodal
  },
  computed: {
  ...mapState({
    // ...
  })
  }
};
</script>

<style lang="scss">
.icon {
  fill: #000 !important;
  stroke: #000;
  width: 100px;
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  // fill: currentColor;
  // fill: #1989FA !important;
  fill: #000 !important;
  overflow: hidden;
}

.icon:hover {
  width: 1.7em;
  height: 1.7em;
}

.mine-form-notice {
  height: 40px;
  box-sizing: border-box;
  padding: 0 0 0 0px;
  // margin: 5px;

  // margin-bottom: -10px;
  // backg
}
.mine-form-tasklist {
  height: calc(100% - 40px);
  // width: 99%;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 0 5px 0 5px;
  margin: 0 auto;
  cursor: pointer;
  & > li {
    background: #fff;
    margin: 8px 0;
    padding: 10px 15px 10px 15px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #ffff;
    // border: 1px solid #ddd;
    .title {
      display: flex;
      height: 30px;
      width: 100%;
      line-height: 30px;
      & > span:nth-of-type(1) {
        flex: 1 1 300px;
      }
      & > img,
      & > svg {
        flex: 0 0 30px;
      }
    }

    .main {
      margin: 5px 0 5px 0;
      & > div {
        color: #555;
        padding: 2px 0 2px 0;
      }
    }
  }
  & > li {
    transition: 0.1s all;
  }
  & > li:active {
    // background: #eee;
    // transition: 1s all;
    border: 1px dotted #1989fa;
  }

  & > li:hover {
    border: 1px dotted #1989fa;
  }

  & > li .icon {
    transition: 0.1s all;
    //  fill: #1989FA !important;
  }

  & > li:hover .icon {
    fill: #1989fa !important;
    // width: 1.7em;
    // height: 1.7em;
  }

  & > li:active .icon {
    // width: 1.7em;
    // height: 1.7em;
    fill: #1989fa !important;
  }
}
</style>