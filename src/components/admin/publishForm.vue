<!--
 * @Author: your name
 * @Date: 2021-10-26 09:27:48
 * @LastEditTime: 2021-10-26 10:32:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/publishForm.vue
-->
<template>
  <div class="publishForm">
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    />
    <!-- 自定义图标 -->
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '30%' }"
    />
    <!-- 图标位置 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '30%' }"
    />

    <!-- <van-datetime-picker
      v-model="currentDate"
      type="datetime"
      title="选择完整时间"
      :min-date="minDate"
      :max-date="maxDate"
    /> -->

      <DatetimePicker/>
  </div>
</template>

<script>
// import Vue from "vue";
import { DatetimePicker, Popup } from "vant";
// Vue.use(DatetimePicker);
// Vue.use(Popup);

export default {
  data() {
    return {
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },
    methods: {
    showPopup() {
      this.show = true;
    },
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
  }
};
</script>