<!--
 * @Author: 王朋坤
 * @Date: 2022-03-21 15:20:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-23 11:31:35
 * @FilePath: /graduation-project-master/src/pages/index/tasklist.vue
 * @Description: 
-->
<template>
  <div style="height:100%;">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height: 100%;" success-text="刷新成功">
        <!-- <p>刷新次数: {{ count }}</p> -->
    <div class="mine-form-notice">
      <van-notice-bar color="#1989fa" background="#fff" left-icon="back-top">
        打卡提示信息
      </van-notice-bar>
    </div>

    <ul class="mine-form-tasklist" style="" > 
      <li v-for="taskitem in pageData.tasklists" v-bind:key="taskitem.key" @click="taskitemjump(taskitem)">
        <div class="title">
          <span>{{taskitem.status}}</span>
          <!-- <img  :src="taskitem.img" alt="" style="color: blue"> -->
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="taskitem.icon"></use>
          </svg>
          
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
import "@/assets/font/index.js"

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
            topic: "暑假实习打卡",
            icon: "#icon-bianjiputong"
          },
          {
            key: 2,
            status: "打卡成功",
            img: require('@/assets/font/query.svg'),
            createuser: "admin",
            time: "2022-03-21 12:00:00",
            topic: "暑假实习打卡",
            icon: "#icon-chaxun"
          },
          {
            key: 3,
            status: "未打卡",
            img: require('@/assets/font/start.svg'),
            createuser: "admin",
            time: "2022-03-21 12:00:00",
            topic: "暑假实习打卡",
            icon: "#icon-kaishibofang"
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
      this.isLoading = false;
      // setTimeout(() => {
      //   // this.$toast('刷新成功');
      //   this.isLoading = false;
      //   this.count++;
      // }, 1000);
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
  // border: 1px solid #ddd;
  .title {
    display: flex;
    height: 30px;
    width: 100%;
    line-height: 30px;
    & > span:nth-of-type(1) {
      flex: 1 1 300px;
    }
    & > img, & > svg {
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
    border: 1px dotted #1989FA;
  }

  & > li:hover {
    border: 1px dotted #1989FA;

  }

  & > li .icon {
     transition: 0.1s all;
  }

  & > li:hover .icon{
      fill: #1989FA !important;
    // width: 1.7em;
    // height: 1.7em;
  }

  & > li:active .icon{
    // width: 1.7em;
    // height: 1.7em;
      fill: #1989FA !important;
  }


}
</style>