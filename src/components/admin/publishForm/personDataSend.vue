<!--
 * @Author: your name
 * @Date: 2021-10-29 14:35:19
 * @LastEditTime: 2021-11-04 10:44:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/publishForm/personDataSend.vue
-->

<template>
  <div
    class="mine-send-part-absolute personDataSend"
    v-bind:class="{ 'send-part-control': true }"
  >
    <div class="send-title">
      确认信息窗口
      <div class="send-control" :style="{'background-image': `url(${require('@/assets/font/arrow-left.svg')})`}" @click="backTo"></div>
    </div>
    <div class="send-main">
      <ul class="mine-double-line" style="padding: 10px">
        <li>
          <div>人员确定</div>
          <div
            style="color: #555; margin-bottom: 0"
            v-for="item in sendStudentData"
            v-bind:key="item.username"
          >
            <div style="background: #fff; padding: 10px; display: flex">
              <div style="flex: 1 0 100px; padding-left: 10px">
                {{ item.name }}
              </div>
              <div style="flex: 1 0 150px">地理信息科学</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="send-footer" @click="sendDdata">确定</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sendStudentData: [],
      taskId: null,
    };
  },
  methods: {
    displayResult(data, taskId) {
      const _this = this;
      data.map((item) => {
        if (item.checked) {
          _this.sendStudentData.push(item);
        }
      });
      this.taskId = taskId;
    },
    sendDdata() {
      const _this = this;
      let sendStudentString = "";
      _this.sendStudentData.forEach((item, index) => {
        sendStudentString += `queryStudent[${index}][username]=${item.username}&queryStudent[${index}][select]=1&`;
      });
      axios
        .get(
          `${process.env.VUE_APP_POSITION_PATH}/api/position/studentTask?${sendStudentString}task_id=${_this.taskId}`
        )
        .then(function (returnData) {
          _this.$toast(returnData.data.result);
        });
    },
    backTo() {
      this.$parent.openPersonChooseFormBack();
    }
  },
  mounted() {
    // axios
    //   .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/studentTask`, {params: {task_id: 21, queryStudent: [{username: 001, select: 1}, {username: 002, select: 1}]}})
    //   .then(function (returnData) {
    //     console.log(returnData.data);
    //   });
    // http://127.0.0.1:8000/api/position/studentTask
    // const params = {
    //   task_id: 21,
    //   // queryStudent[0]: {username: nur, select: 1}
    // };
    // console.log(params);
    // axios
    //   .get(
    //     `${process.env.VUE_APP_POSITION_PATH}/api/position/studentTask?queryStudent[0][username]=nur&queryStudent[0][select]=1&queryStudent[1][username]=wpk&queryStudent[1][select]=1&task_id=24`
    //   )
    //   .then(function (data) {
    //     console.log(data);
    //   });
  },
};
</script>