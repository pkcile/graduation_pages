<!--
 * @Author: your name
 * @Date: 2021-11-09 22:19:20
 * @LastEditTime: 2022-02-28 22:05:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/main.vue
-->

<template>
  <div style="width:100%;height:100%;background:#fff;" class="sign">
    <!-- 签到信息获取窗口 -->
    <step-sign-get
      class="step-sign-get"
      @open-send-form="openSendForm"
    ></step-sign-get>
    <!-- 签到信息发送窗口 -->
    <step-sign-send
      v-bind:style="{ visibility: form.dataSend }"
      @open-result-form="openResultForm"
    ></step-sign-send>
    <!-- 签到信息结果显示窗口 -->
  </div>
</template>

<script>
import StepSignGet from './get.vue';
import stepSignSend from './send.vue';
import axios from "axios";

export default {
  components: {
    StepSignGet: StepSignGet,
    stepSignSend: stepSignSend,
  },
  data() {
    return {
      form: {
        dataResult: 'hidden',
        dataSend: 'hidden'
      },
      studentData: null,
      taskId: null,
      dataSend: {
        username: this?.$store?.state?.User?.login?.username,
        comment: "",
        latitude: 0,
        longitude: 0,
        poiname: "默认POI名称"
      },
      
    };
  },
  computed: {
    
  },
  methods: {
    openSendForm(data) {
      this.form.dataSend = 'visible';
      this.form.dataResult = 'hidden';
      this.dataSend.latitude = data?.geolocationData?.latitude;
      this.dataSend.longitude = data?.geolocationData?.longitude;
      console.log(this.dataSend);
    },
    openResultForm(data) {
        const _this = this;
        this.dataSend.comment = data.comment;
        // 向给定ID的用户发起请求
        axios
          .get("/api/position/signInRecord", {
            params: _this.dataSend
              // {
              //   //   'username' => 'bar',
              //   //   'latitude' => 'foo',
              //   //   'longitude' => 121.1,
              //   //   'latitude' => 26.11,
              //   //   'comment' => "备注"
              //   // username: "bar",
              //   // latitude: 121.1,
              //   // longitude: 26.1,
              //   // comment: "备注",
              // },
              
          })
          .then(function (returnData) {
            // 处理成功情况
            // console.log(returnData);
            if (returnData.data.status == true) {
              _this.$toast("处理成功");
              // 计数归零
              _this.commitNumber = 0;
              _this.form.dataSend = 'hidden';
              // 路由结果跳转
            }
            else {
              _this.$toast("处理失败");
            }
          })
          .catch(function (error) {
            // 处理错误情况
            console.log(error);
          })
          .then(function () {
            // 总是会执行
          });


    },
    backStartForm(data) {
      this.form.dataSend = 'hidden';
      this.form.dataResult = 'hidden';
    }
  },
  mounted() {

  },
  beforeDestroy() {
    console.log("beforeDestory");
  },
  destroyed() {
    console.log("destroyed");
  }
}
</script>

<style lang="scss" scoped>
.publishForm {
  background: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>