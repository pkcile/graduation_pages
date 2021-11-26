<!--
 * @Author: your name
 * @Date: 2021-11-09 22:19:20
 * @LastEditTime: 2021-11-25 17:53:18
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
      }
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
      this.form.dataSend = 'hidden';
      this.form.dataResult = 'visible';
      this.dataSend.comment = data.comment;
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