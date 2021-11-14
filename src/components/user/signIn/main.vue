<!--
 * @Author: your name
 * @Date: 2021-11-09 22:19:20
 * @LastEditTime: 2021-11-14 20:58:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/main.vue
-->

<template>
  <div style="width:100%;height:100%;background:#fff;" class="sign">
    <!-- 签到信息获取窗口 -->
    <step-sign-get
      class="step-sign-get"
    ></step-sign-get>
    <!-- 签到信息发送窗口 -->
    <step-sign-send
      v-bind:style="{ display: form.personChooseForm }"
    ></step-sign-send>
    <!-- 签到信息结果显示窗口 -->
    <step-sign-result
      v-bind:style="{ display: form.personDataSend }"
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
        personChooseForm: "none",
        personDataSend: "block",
      },
      studentData: null,
      taskId: null
    };
  },
  computed: {},
  methods: {
    openPersonChooseForm(data) {
      this.form.personChooseForm = "block";
      this.form.personDataSend = "none";
      this.taskId = data;
    },
    openPersonDataSend(data) {
      this.form.personChooseForm = "none";
      this.form.personDataSend = "block";
      this.studentData = data;
      // 传递sendStudentData的值给personDataSend组件
      this.$refs["sendStudentData"]?.displayResult(this.studentData, this.taskId);
    },
    openClockInforOnly() {
      this.form.personChooseForm = "none";
      this.form.personDataSend = "none";
    },
    openPersonChooseFormBack() {
      this.form.personChooseForm = "block";
      this.form.personDataSend = "none";
    },
  },
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