<!--
 * @Author: 王朋坤
 * @Date: 2022-04-01 16:36:02
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-05-07 15:38:29
 * @FilePath: /graduation-project-master/src/pages/mine/mine.vue
 * @Description: 
-->
<template>
  <div class="home-mine">
    <logcomponent v-show="logcomponentControl" ref="logcomponentRef"></logcomponent>
    <inforquerycomponent v-show="inforquerycomponentControl" ref="inforquerycomponentRef"> </inforquerycomponent>
    <!-- 用户信息设置 -->
    <div class="mine-form-user-information"  @click="openuserinfor()">
      <img :src="userimg" alt="" />
      <div class="user-main">
        <!-- <div>{{ this.$store.state.User.login.userinformation ? "姓名：" + this.$store.state.User.login.userinformation.name : "guest" }}</div> -->
        <div style="color:#007AFF;">{{ this.$store.state.User.login.userinformation ?  "" + this.$store.state.User.login.userinformation.username : "000" }}</div>
      </div>
      <div class="user-jump"  :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
    </div>
    <!-- 用户信息查看 -->
    <ul class="mine-form-display-infor" style="">
      <li>
        <span>{{ "学号"}}</span>
        <span>{{ this.$store.state.User.login.userinformation ?  "" + this.$store.state.User.login.userinformation.studynth : "00" }}</span>
      </li>
      <li>
        <span>{{ "身份"}}</span>
        <span>{{ this.$store.state.User.login.userinformation ?  "" + this.$store.state.User.login.userinformation.role : "学生" }}</span>
      </li>
      <li @click="logDisplay">
        <span>打卡日志</span>
        <span>共计{{ logCount }}条</span>
         <span class="user-jump"  :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`, backgroundSize: '22px',backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', flex: '1 0 50px'}"></span>
      </li>
      <li>  
        <span>注册时间</span>
        <span>{{ this.$store.state.User.login.userinformation ?  "" + this.$store.state.User.login.userinformation.register : "2018-09-10 09:00"  }}</span>
      </li>
    </ul>
    <!-- 用户功能设置 -->
    <div class="mine-button-block mine-button-white" @click="loginOut">退出登录</div>
  </div>
</template>

<script>
import "@/assets/style/common/mobile-form.scss"
import { Dialog } from 'vant';
import { mapState, mapMutations} from "vuex";
import { TaskDealWith } from "@/utils/judgetasks.js";
import  logcomponent from "./log.vue"
import inforquerycomponent from "./inforquery.vue"
import { getResultClockLogCount } from "@/api/mine/index.js";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component.name,
    logcomponent: logcomponent,
    inforquerycomponent: inforquerycomponent
  },
  methods: {
    loginOut() {
      this.$router.push("/user/login");
      window.sessionStorage.clear("loginData");
      this.$toast("注销登陆成功");
    },
    logDisplay() {
      // this.logcomponentControl = true;
      this.$refs["logcomponentRef"].initCurrentTime();
    },
    openuserinfor() {
      this.$refs["inforquerycomponentRef"].usereditcomponentRefFun(this.$store.state.User.login.userinformation);
      // this.userimg = require('@/assets/img/user/1.jpg');
    },
    ...mapMutations('User', [
      'updateStatus'
    ]),
  },
  data() {
    return {
      logcomponentControl: false,
      inforquerycomponentControl: false,
      logCount: null,
      userimg:  require('@/assets/img/user/1.jpg')
    }
  },
  created: function() {
    // this.$store.commit("User/updateStatus");
    this.updateStatus();
    getResultClockLogCount({
        studynth: this.$store.state.User.login.userinformation?.studynth,
        // currentStamp: dateobj
      }).then(returnData => {
      this.logCount = returnData.data.result;
  
    })

    this.userimg =  require('@/assets/img/user/' + this.$store.state.User.login.userinformation.imglink + '') ? require('@/assets/img/user/' + this.$store.state.User.login.userinformation.imglink + ''): this.userimg;
  },
  mounted() {
    // this.$notify({type: "primary", message: "欢迎来到个人中心"});
  }
}
</script>

<style lang="scss" scoped>
.home-mine {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.van-dialog .van-dialog--default {
  border-radius: 8px !important;
  // border-radius: 16px;
}

</style>
