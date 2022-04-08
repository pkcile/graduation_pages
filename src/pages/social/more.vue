<!--
 * @Author: 王朋坤
 * @Date: 2022-03-27 15:14:41
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-08 23:06:33
 * @FilePath: /graduation-project-master/src/pages/social/more.vue
 * @Description: 
-->
<template>
  <div class="home-social">  
    <div class="user">
      <div class="mine-single-line-three-social-title">
        {{ pageData.user.title }}
      </div>
      <router-link v-bind:to="item.router" v-for="item in pageData.user.items" v-bind:key="item.key" v-show="item.show">
        <div class="mine-single-line-three-social">
          <div><img :src="item.backgroundimg" alt="" style="width: 50%;height: 50%;"></div>
          <div>{{ item.name }}</div>
          <div :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
        </div>
      </router-link> 
    </div> 

    <div class="admin">
      <div class="mine-single-line-three-social-title">
        {{ pageData.admin.title }}
      </div>
      <router-link v-bind:to="item.router" v-for="item in pageData.admin.items" v-bind:key="item.key" v-show="item.show">
        <div class="mine-single-line-three-social">
          <div><img :src="item.backgroundimg" alt="" style="width: 50%;height: 50%;"></div>
          <div>{{ item.name }}</div>
          <div :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
        </div>
      </router-link> 
    </div> 
  </div>

</template>

<style lang="scss" scoped>
  .mine-single-line-three-social {
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

  .mine-single-line-three-social:active {
    background-color: #eee;
    transition: all 1000ms;
  }
  
  .mine-single-line-three-social-title {
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
      pageData: {
        user: {
          title: "用户功能",
          items: [
            {
              name: "动态显示",
              router: "/social",
              key: "001",
              backgroundimg: require("@/assets/font/social-reddit.svg"),
              show: false
            },
            {
              name: "位置签到",
              router: "/sign",
              key: "002",
              backgroundimg: require("@/assets/font/position.svg"),
              show: false
            },
            {
              name: "运动轨迹",
              router: "/path",
              key: "003",
              backgroundimg: require("@/assets/font/position.svg"),
              show: false
            },
            {
              name: "好友列表",
              router: "/sign",
              key: "004",
              backgroundimg: require("@/assets/font/position.svg"),
              show: false
            },
            
          ]
        },
        admin: {
          title: "管理员功能",
          items: [
            {
              name: "注册管理",
              router: "/home/usercontrol",
              key: "004",
              backgroundimg: require("@/assets/font/clock.svg"),
              show: true
            },
            {
              name: "任务发布",
              router: "/home/admin",
              key: "001",
              backgroundimg: require("@/assets/font/clock.svg"),
              show: true
            },
            {
              name: "任务查看",
              router: "/edit",
              key: "002",
              backgroundimg: require("@/assets/font/clock.svg"),
              show: false
            },
            {
              name: "打卡统计",
              router: "/edit",
              key: "003",
              backgroundimg: require("@/assets/font/clock.svg"),
              show: false
            }     
          ]
        }
      },
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
    jumpTosocialMain() {
      this.$router.push("/social/state");
    },
    jumpToLocationDing() {
      this.$router.push("/sign/get");
    }
  },
  mounted() {
    // this.$notify({type: "primary", message: "欢迎来到动态模块"});
  }
}
</script>

<style lang="scss" scoped>

</style>
