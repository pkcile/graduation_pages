<!--
 * @Author: your name
 * @Date: 2021-11-07 16:48:05
 * @LastEditTime: 2021-11-08 00:06:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/social/state.vue
-->

<template>
  <div
    class="mine-send-part-absolute personChooseForm"
    v-bind:class="{ 'send-part-control': true }"
    style="z-index: 2"
  >
    <div class="send-title">
      用户动态显示
      <div
        class="send-control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backToSocial"
      ></div>
    </div>
    <div class="send-main">
      <div class="mine-card" v-for="item in studentData" v-bind:key="item.id">
        <h3>
          <img src="@/assets/img/user/1.jpg" alt="" />
          <div class="name">{{ item["user_username"]}}</div>
          <div class="date">{{ item["edittime"] }}</div>
          <div class="more">...</div>
        </h3>
        <div class="content">{{ item["comment"]}}</div>
        <div class="comment">
          <div class="status" v-if="item.status == '1'" style="color: blue;">
            打卡正常 
          </div>
          <div class="status" v-if="item.status == '2'" style="color: red;">
            打卡失败
          </div>
        </div>
      </div>
    </div>
    <div
      style="background: rgba(255, 255, 255, 0); height: 76px"
      class="send-footer"
    >
      <van-pagination
        v-model="currentPage"
        :total-items="24"
        :items-per-page="5"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script>
import { Pagination } from "vant";
import axios from "axios"

export default {
  components: {
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      currentPage: 1,
      checked: false,
      studentData: [
        {
          "user_username": "hhxx",
          "task_id": "47",
          "edittime": "2021-07-05 18:49:16",
          "status": "1",
          "comment": "好好学习测试打卡"
        }
      ],
    };
  },
  mounted() {
    const _this = this;
    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/recordshow`)
      .then(function (returnData) {
        console.log(returnData.data);
        returnData.data.recordShow.map((item, index) => {
          if(item.edittime) {
            _this.studentData.push({
              "user_username": item["user_username"],
              "username": "0000",
              "edittime": item.edittime,
              "status": item.status,
              "comment": item.comment,
              "id": index
            });
          }
        });
        console.log(_this.studentData);
      });
  },
  methods: {
    backToSocial() {
      this.$router.push("/home/social");
    }
  }
};
</script>

<style lang="scss" scoped>
.mine-card {
  width: 95%;
  border: 1px solid #d5e5f9;
  border-radius: 3px;
  margin: 10px auto 20px;
  & > h3 {
    height: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: left;
    background: #f1f8ff;
    & > img {
      height: 68%;
      // width: 50px;
      border-radius: 25px;
      margin-left: 5px;
    }
    & > .name {
      flex: 1 0 40px;
      margin-left: 10px;
    }
    & > .date {
      flex: 4 0 200px;
    }
    & > .more {
      flex: 0 0 50px;
    }
  }
  & > .content {
    line-height: 25px;
    padding: 15px;
  }
  & > .comment {
    padding: 5px 15px;
    border-top: 1px solid #e0e4e7;
  }
}

.personChooseForm {
  width: 100%;
  height: 100%;
  // background: #bfa;
}
.send-main {
  background: #fff;
}
.send-footer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-flow: center;
  align-items: center;
  justify-content: center;
  // align-content
}
</style>