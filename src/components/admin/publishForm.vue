<!--
 * @Author: your name
 * @Date: 2021-10-26 09:27:48
 * @LastEditTime: 2021-10-29 15:00:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/publishForm.vue
-->
<template>
  <div class="publishForm">
    <!-- 打卡信息设置窗口 -->
    <clock-infor-form></clock-infor-form>
    <!-- 人员选择窗口 -->
    <person-choose-form></person-choose-form>
    <!-- 确认信息发送框 -->
    <person-data-send></person-data-send> 
  </div>
</template>

<script>
import clockInforForm from "./clockInforForm.vue"
import personChooseForm from "./personChooseForm.vue"
import personDataSend from "./personDataSend.vue"

export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  components: {
    clockInforForm: clockInforForm,
    personChooseForm: personChooseForm,
    personDataSend: personDataSend
  },
  mounted() {
  },
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