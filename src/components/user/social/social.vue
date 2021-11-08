<!--
 * @Author: your name
 * @Date: 2021-10-14 19:46:07
 * @LastEditTime: 2021-11-08 00:03:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/social/social.vue
-->

<template>
  <div class="home-social">  
    <div class="user">
      <div class="mine-single-line-three-socail-title">
        用户功能
      </div> 
      <div class="mine-single-line-three-socail" @click="jumpToSocailMain">
        <div><img src="@/assets/font/social-reddit.svg" alt="" style="width: 50%;height: 50%;"></div>
        <div>动态显示</div>
        <div :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
      </div>
      <div class="mine-single-line-three-socail" @click="jumpToPublishForm">
        <div><img src="@/assets/font/position.svg" alt="" style="width: 50%;height: 50%;"></div>
        <div>位置签到</div>
        <div :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
      </div>
    </div> 

    <div class="admin">
      <div class="mine-single-line-three-socail-title">
        管理员功能
      </div> 

      <div class="mine-single-line-three-socail" @click="jumpToPublishForm">
        <div><img src="@/assets/font/clock.svg" alt="" style="width: 50%;height: 50%;"></div>
        <div>任务发布</div>
        <div :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
      </div>
      <div class="mine-single-line-three-socail" @click="jumpToPublishForm">
        <div><img src="@/assets/font/social-reddit.svg" alt="" style="width: 50%;height: 50%;"></div>
        <div>打卡统计</div>
        <div :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
      </div>
    </div>


  </div>

</template>

<style lang="scss" scoped>
  .mine-single-line-three-socail {
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
    align-items: center;
    height: 50px;
    padding: 0px 16px;
    background: #fff;
    border-bottom: 1px solid #EFEFF3;
    color: #555;
    & > div:nth-of-type(1) {
      flex: 0 0 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > div:nth-of-type(2) {
      flex: 1 0 100px;
    }
    & > div:nth-of-type(3) {
      flex: 0 0 50px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      height: 50%;
    }
  }

  .mine-single-line-three-socail:active {
    background-color: #eee;
    transition: all 1000ms;
  }
  
  .mine-single-line-three-socail-title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
    align-items: center;
    height: 40px;
    padding: 0px 27px;
    background: #fff;
    color: #555;
    border-bottom: 1px solid #EFEFF3;
  }
  .user {
    background: #fff;
    padding-bottom: 20px;
  }
</style>

<script>
import studentTask from "@/api/studentTask.js";
import axios from "axios"
import  {Cell, CellGroup, Icon } from "vant"
let params = {username: "pkcile", password: "1234"};

export default {
  beforeCreate() {
    const _this = this;
    // // 数据发送
    // axios.get(`${process.env.VUE_APP_POSITION_PATH}/api/position/recordShow`).then(function(returnData) {
    //   console.log(returnData.data);
    //   _this.currentContact = returnData.data.recordShow;
    //   console.log(_this.currentContact);
     
    // });
  },
  data() {
    return {
      currentContact: {
      }
    }
  },
  components :{
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
  },
  methods: {
    jumpToPublishForm() {
      this.$router.push("/home/admin");
    },
    jumpToSocailMain() {
      this.$router.push("/social/state");
    }
  },
  mounted() {
    // this.$notify({type: "primary", message: "欢迎来到动态模块"});
  }
}
</script>

<style lang="scss" scoped>

</style>
