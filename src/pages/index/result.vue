<!--
 * @Author: 王朋坤
 * @Date: 2022-03-26 15:57:41
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-26 17:52:19
 * @FilePath: /graduation-project-master/src/pages/index/result.vue
 * @Description: 
-->

<template>
  <div
    class="mine-send-part-absolute personDataSend"
    style="
      position: fixed;
      width: 100%;
      height: 100%;
      background: #efeff3;
      top: 0px;
      z-index: 100;
    "
    v-bind:class="{ 'send-part-control': true }"
  >
    <div class="send-title">
      打卡窗口
      <div
        class="send-control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
    </div>
    <div class="send-main" style="height: calc(100% - 50px);overflow-y:auto;">
      <!-- 表单 -->
      <ul class="mine-form-display" style="">
        <li>
          <span>打卡主题</span>
          <span>{{ $store.state.User.login.task_starttime }}</span>
        </li>
        <li>
          <span>开始时间</span>
          <span>{{ $store.state.User.login.task_starttime }}</span>
        </li>
        <li>
          <span>结束时间</span>
          <span>{{ $store.state.User.login.task_endtime }}</span>
        </li>
        <!-- <li>
          <span>创建人员</span>
          <span>{{ $store.state.User.login.task_starttime }}</span>
        </li> -->
        <li>
          <span>打卡状态</span>
          <span>{{ $store.state.User.login.task_starttime }}</span>
        </li>
        <li>
          <span>打卡地点</span>
          <span>{{ $store.state.User.login.task_placename }}</span>
        </li>
        <li>
          <span>签到误差</span>
          <span>{{ $store.state.User.login.task_starttime }}</span>
        </li>

        <li style="background: #efeff3"><span>备注</span></li>
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          placeholder="请详细描述你的问题和意见..."
        ></textarea>
      </ul>
      <div
        class="mine-button-block bottom-fix"
        style="position: sticky; bottom: 20px; left: 0;margin-top:15px;"
      >
        打卡/更新
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexmodal",
  props: {
    tasklistsSelectItem: Object
  },
  data() {
    return {
      sendStudentData: [],
      taskId: null,
    };
  },
  methods: {
    displayResult() {},
    sendDdata() {},
    backTo() {
      console.log(this.$parent.count);
      console.log(this.$parent.pageResult);
      this.$parent.pageResult = false;
      // console.log(this.$parent.pageResult);
      // this.$emit("fun0001", "data");
    },
  },
  mounted() {
    console.log(this.tasklistsSelectItem);
  },
};
</script>


<style lang="scss">
</style>