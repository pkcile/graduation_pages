<!--
 * @Author: 王朋坤
 * @Date: 2022-03-21 15:20:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-21 17:27:17
 * @FilePath: /graduation-project-master/src/pages/index/tasklist.vue
 * @Description: 
-->
<template>
  <div style="height:100%;">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%;" success-text="刷新成功">
        <!-- <p>刷新次数: {{ count }}</p> -->
    <div class="mine-form-notice">
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="back-top">
        打卡提示信息
      </van-notice-bar>
    </div>
    <ul class="mine-form-tasklist" style="" > 
      <li v-for="taskitem in pageData.tasklists" v-bind:key="taskitem.key" @click="taskitemjump(taskitem)">
        <div class="title">
          <span>{{taskitem.status}}</span>
          <img  :src="taskitem.img" alt="">
        </div>
        <div class="main">
          <div >主题：{{ taskitem.topic }}</div>
          <div >时间：{{ taskitem.time }}</div>
        </div>
      </li>
    </ul>

</van-pull-refresh>


  </div>
</template>

<script>
import { PullRefresh, NoticeBar } from "vant";
import { flatearthDistance } from "@/utils/distance2.js";
import axios from "axios";

export default {
  props: {
    show: Boolean,
  },
  name: "modal",
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
            topic: "暑假实习打卡"
          },
          {
            key: 2,
            status: "打卡成功",
            img: require('@/assets/font/query.svg'),
            createuser: "admin",
            time: "2022-03-21 12:00:00",
            topic: "暑假实习打卡"
          },
          {
            key: 3,
            status: "未打卡",
            img: require('@/assets/font/start.svg'),
            createuser: "admin",
            time: "2022-03-21 12:00:00",
            topic: "暑假实习打卡"
          },

        ]
      },
      returnData: {

      },
      showResulet: this.show,
         count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    taskitemjump(jumpitem) {
      console.log("jump", jumpitem);
    }
  },
  mounted() {
  },
  components: {
    [PullRefresh.name]: PullRefresh,
    [NoticeBar.name]: NoticeBar,
    
  },
};
</script>

<style lang="scss">
.mine-form-notice {
  height: 40px;
  box-sizing: border-box;
  padding: 0 0 0 0px;

  // margin-bottom: -10px;
  // backg

}
.mine-form-tasklist {
  height: calc(100% - 40px);
  width: 99%;
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
  .title {
    display: flex;
    height: 30px;
    width: 100%;
    line-height: 30px;
    & > span:nth-of-type(1) {
      flex: 1 1 300px;
    }
    & > img{
      flex: 0 0 30px;;
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

  & > li:active {
    // background: #eee;
    // transition: 1s all;
  }

  & > li:hover {
    border: 1px dotted #f00;

  }


}
</style>