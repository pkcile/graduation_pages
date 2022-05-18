<!--
 * @Author: 王朋坤
 * @Date: 2022-03-21 15:20:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-18 23:37:29
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
          {{ this.$store.state.User.websocketnotice }}
        </van-notice-bar>
      </div>
      <!-- pageData.tasklists.length -->

      <ul class="mine-form-tasklist" style="" v-if="pageData.tasklists != 0">
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
            <div>主题：{{ taskitem.topic }}</div>
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
    <transition name="component-fade" mode="out-in">
      <indexmodal
        v-show="pageResult"
        @fun0001="resultClose"
        :tasklistsSelectItem="pageData.tasklistsSelectItem"
        ref="tasklistsEvent"
      >
      </indexmodal>
    </transition>
  </div>
</template>

<script>
import { PullRefresh, NoticeBar } from "vant";
import { Empty } from "vant";
import "@/assets/font/index.js";
import { mapState, mapMutations } from "vuex";
import { TaskDealWith } from "@/utils/judgetasks.js";
import { getTaskLists, tasklistsToPagelist } from "@/utils/getTaskLists.js";
import indexmodal from "./listitem.vue";
import {
  getCurrentLocation2,
} from "@/utils/geolocation.js";
import { GetWiFiAndLocation2 } from "@/utils/DeviceInfor.js";
import { taskQueryApi } from "@/api/index/index.js";
// import { io } from "socket.io-client";
// import { flatearthDistance } from "@/utils/distance2.js";
// import eventbus from "@/utils/evenbus.js";
// import { convertDate } from "@/utils/date.js";

export default {
  props: {
    show: Boolean,
  },
  name: "tasklist",
  data() {
    return {
      pageData: {
        tasklists: [],
        tasklistsSelectItem: {},
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
      this.taskqueryRefresh().then((data) => {
        console.log(data);
        this.isLoading = false;
      });
    },
    taskitemjump(jumpitem) {
      const _this = this;
      this.pageData.tasklistsSelectItem = jumpitem;
      this.$toast.loading({
        message: "位置加载中...",
        forbidClick: true,
        duration: 0,
      });
      getCurrentLocation2().then((returnData) => {
        if (!returnData?.longitude) {
          this.$toast("位置获取失败");
          this.pageResult = true;

          const aabbcc = {
            wifiList: [
              // { bssid: "c2:65:c7:d9:ad:78", ssid: "pkcile", level: -67, id: 1 },
              // { bssid: "c2:65:c7:d9:ad:7c", ssid: "pkcile", level: -83, id: 2 },
              // { bssid: "04:95:e6:77:d6:71", ssid: "金豆豆", level: -74, id: 3 },
            ],
          };
          const geometry = {
            coordinates: [0, 0],
            type: "Point",
            accuracy: 99,
          };

          // wifi保存
          // console.log( );
          _this.wifiStore(aabbcc.wifiList);
          _this.geometryStore(geometry);

          this.$refs["tasklistsEvent"].tasklistsEventCall(
            this.pageData.tasklistsSelectItem
          );

          return;
        }
        this.pageData.tasklistsSelectItem.geometry = {
          coordinates: [returnData.longitude, returnData.latitude],
          type: "Point",
          accuracy: returnData.accuracy,
        };

        // 仅android环境下
        if (window.plus) {
          GetWiFiAndLocation2().then((data) => {
            console.log(data);
            this.pageData.tasklistsSelectItem.geometry = {
              coordinates: [
                data.positionList.coords.longitude,
                data.positionList.coords.latitude,
              ],
              type: "Point",
              accuracy: returnData.accuracy,
            };
            _this.wifiStore(data.wifiList);
            _this.geometryStore(_this.pageData.tasklistsSelectItem.geometry);
            // wifi保存
          });
        } else {
          const aabbcc = {
            wifiList: [
              // { bssid: "c2:65:c7:d9:ad:78", ssid: "pkcile", level: -67, id: 1 },
              // { bssid: "c2:65:c7:d9:ad:7c", ssid: "pkcile", level: -83, id: 2 },
              // { bssid: "04:95:e6:77:d6:71", ssid: "金豆豆", level: -74, id: 3 },
            ],
          };

          // wifi保存
          console.log("wifi", +_this.wifiStore);
          _this.wifiStore(aabbcc.wifiList);
          _this.geometryStore(_this.pageData.tasklistsSelectItem.geometry);
        }

        // 位置保存
        this.$toast.clear();
        this.$toast.success("位置获取成功");
        this.pageResult = true;
        this.$refs["tasklistsEvent"].tasklistsEventCall(
          this.pageData.tasklistsSelectItem
        );
      });
    },
    tasksToJudgeArray(tasks) {
      let taskDealWith = new TaskDealWith({ tasks });
      return taskDealWith.singlestamptaskArray;
    },
    resultClose() {
      this.pageResult = false;
    },
    taskqueryRefresh() {
      const User = this.$store.state.User;
      return new Promise((resolve) => {
        taskQueryApi({
          studynth: User.login.userinformation?.studynth,
          username: User.login.userinformation?.username,
        }).then((returnData) => {
          if (returnData?.data.result) {
            this.taskQueryStore(returnData.data.result);

            let getTaskListsData = getTaskLists(returnData.data.result.tasks);
            let pagelistData = tasklistsToPagelist(getTaskListsData);
            this.pageData.tasklists = pagelistData;
            resolve("获取成功");
          } else {
            this.$toast("服务器错误");
            resolve("获取失败");
          }
        });
      });
    },
    ...mapMutations("User", [
      "oneMethod",
      "taskQueryStore",
      "updateStatus",
      "wifiStore",
      "geometryStore",
    ]),
  },
  mounted() {},
  created() {
    // 持久化保存
    this.$store.commit("User/updateStatus");
    // 数据条目格式化处理
    const User = this.$store.state.User;
    // 如果过期，则重新获取任务，10秒未获取重新获取
    if (
      User.taskinforlasttimestamp &&
      Date.now() - User.taskinforlasttimestamp < 10000
    ) {
      // 使用缓存，不变动
      let getTaskListsData = getTaskLists(User.login.tasks);
      let pagelistData = tasklistsToPagelist(getTaskListsData);
      this.pageData.tasklists = pagelistData;
    } else {
      // 重新获取
      this.taskqueryRefresh().then((data) => {
        console.log(data);
      });
    }
  },
  destroyed() {
    // console.log("该组件可销毁 tasklist");
  },
  components: {
    [PullRefresh.name]: PullRefresh,
    [NoticeBar.name]: NoticeBar,
    [Empty.name]: Empty,
    indexmodal: indexmodal,
  },
  computed: {
    ...mapState({
      // ...
    }),
  },
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
}
.mine-form-tasklist {
  height: calc(100% - 40px);
  // width: 99%;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 0 5px 0 5px;
  margin: 0 auto;
  cursor: pointer;
  & li {
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
  & li {
    transition: 0.1s all;
  }
  & li:active {
    // background: #eee;
    // transition: 1s all;
    border: 1px dotted #1989fa;
  }

  & li:hover {
    border: 1px dotted #1989fa;
  }

  & li .icon {
    transition: 0.1s all;
    //  fill: #1989FA !important;
  }

  & li:hover .icon {
    fill: #1989fa !important;
    // width: 1.7em;
    // height: 1.7em;
  }

  & li:active .icon {
    // width: 1.7em;
    // height: 1.7em;
    fill: #1989fa !important;
  }
}
</style>