<!--
 * @Author: 王朋坤
 * @Date: 2022-03-21 15:20:55
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-21 16:16:53
 * @FilePath: /graduation-project-master/src/pages/index/tasklist.vue
 * @Description: 
-->
<template>
  <div>
    <ul class="mine-form-tasklist" style="" > 
      <li v-for="taskitem in pageData.tasklists" v-bind:key="taskitem.key">
        <div class="title">
          <span>{{taskitem.status}}</span>
          <img  :src="taskitem.img" alt="">
        </div>
        <div class="main">
          <div >主题：{{ taskitem.topic }}</div>
          <div >时间：{{ taskitem.time }}</div>
          <div >创建人：{{ taskitem.createuser }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { NavBar } from "vant";
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
            img: require('@/assets/font/edit.svg'),
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
    };
  },
  methods: {
  },
  mounted() {
  },
  components: {
    [NavBar.name]: NavBar,
  },
};
</script>

<style lang="scss">
.mine-form-tasklist {
  width: 96%;
  margin: 5px auto;
  & > li {
  background: #fff;
  margin: 8px 0;
  padding: 10px 15px 10px 15px;
  border-radius: 5px;
  box-sizing: border-box;
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


}
</style>