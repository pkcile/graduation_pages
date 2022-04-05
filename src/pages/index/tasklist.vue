<!--
 * @Author: 王朋坤
 * @Date: 2022-03-21 15:20:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-05 22:49:29
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
           {{  this.$store.state.User.websocketnotice }} 
        </van-notice-bar>
      </div>
      <!-- pageData.tasklists.length -->
      <ul class="mine-form-tasklist" style="" v-if="1" >
        <!-- 打卡任务状态 -->
        <li
          v-for="taskitem in pageData.tasklists"
          v-bind:key="taskitem.key"
          @click="taskitemjump(taskitem)"
        >
          <div class="title">
            <span>{{ "" + taskitem.status }}</span>
            <!-- <img  :src="taskitem.img" alt="" style="color: blue"> -->
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="taskitem.icon"></use>
            </svg>
          </div>
          <div class="main">
            <div>主题：{{  taskitem.topic }}</div>
            <div>打卡时间：{{ taskitem.time }}</div>
          </div>
        </li>
        <!-- 服务添加状态 -->
        <!-- <li
        >
          <div class="title">
            <span>{{ "选点任务" }}</span>
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`cross`"></use>
            </svg>
          </div>
          <div class="main">
            <div>主题：{{ "疫情在家选点任务" }}</div>
          </div>
        </li> -->
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

import {io} from "socket.io-client"

export default {
  props: {
    show: Boolean,
  },
  name: "tasklist",
  data() {
    return {
      pageData: {
        tasklists: [
          {
            key: Date.now(),
            status: "打卡失败",
            img: require('@/assets/font/edit-false.svg'),
            createuser: "admin",
            time: "2022-03-21 12:00:00",
            topic: "暑假实习打卡",
            icon: "#icon-bianjiputong"
          },
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
  },
  created() {
    // 持久化保存
    // this.$store.commit("User/updateStatus");

    // 数据条目格式化处理
    const User = this.$store.state.User;
    const tasks = User.login?.tasks;
    console.log(this.tasksToJudgeArray(tasks))

    // this.pageData.tasklists = this.judgeArrayToTasklists();
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