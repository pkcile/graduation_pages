<!--
 * @Author: your name
 * @Date: 2021-11-09 22:19:20
 * @LastEditTime: 2021-11-27 11:19:26
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
    <step-sign-result
      v-bind:style="{  visibility: form.dataResult }"
      @back-start-form="backStartForm"
    ></step-sign-result>
  </div>
</template>

<script>
import StepSignGet from './stepSignGet.vue';
import stepSignSend from './stepSignSend.vue';
import StepSignResult from './stepSignResult.vue';
import axios from "axios";

// import stepSignResult from "./stepSignResult.vue";
// import stepSignSend from "./stepSignSend.vue";
export default {
  components: {
    StepSignGet: StepSignGet,
    stepSignSend: stepSignSend,
    StepSignResult: StepSignResult,
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
  computed: {},
  methods: {
    openSendForm(data) {
      this.form.dataSend = 'visible';
      this.form.dataResult = 'hidden';
      this.dataSend.latitude = data.geolocationData.latitude;
      this.dataSend.longitude = data.geolocationData.longitude;
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
              // 计数归零
              _this.commitNumber = 0;
              _this.form.dataSend = 'hidden';
              _this.form.dataResult = 'visible';

            }
            else {
              alert("尝试失败");
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
    // this.form.dataResult = "block";
    // this.form.dataResult = "none";
    
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