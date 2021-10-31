<!--
 * @Author: your name
 * @Date: 2021-10-28 08:56:50
 * @LastEditTime: 2021-10-31 10:55:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/publishForm.vue
-->
<template>
  <div class="publishForm">
    <!-- 打卡信息设置窗口 -->
    <clock-infor-form
      class="clock-infor-form"
      @open-person-choose-form="openPersonChooseForm"
    ></clock-infor-form>
    <!-- 人员选择窗口 -->
    <person-choose-form
      v-bind:style="{ display: form.personChooseForm }"
      @open-person-data-send="openPersonDataSend"
    ></person-choose-form>
    <!-- 确认信息发送框 -->
    <person-data-send
      v-bind:style="{ display: form.personDataSend }"
      ref="sendStudentData"
    ></person-data-send>
  </div>
</template>

<script>
import clockInforForm from "./clockInforForm.vue";
import personChooseForm from "./personChooseForm.vue";
import personDataSend from "./personDataSend.vue";

export default {
  data() {
    return {
      form: {
        personChooseForm: "none",
        personDataSend: "none",
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
  },
  components: {
    clockInforForm: clockInforForm,
    personChooseForm: personChooseForm,
    personDataSend: personDataSend,
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.publishForm {
  background: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  .clock-infor-form {
    width: 100%;
    height: 100%;
  }
}
</style>