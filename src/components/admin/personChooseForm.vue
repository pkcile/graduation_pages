<!--
 * @Author: your name
 * @Date: 2021-10-29 14:33:06
 * @LastEditTime: 2021-10-29 14:52:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/personChooseForm.vue
-->

<template>
  <div
    class="mine-send-part-absolute personChooseForm"
    v-bind:class="{ 'send-part-control': true }"
    style="z-index: 2"
  >
    <div class="send-title">
      人员选择窗口
      <div class="send-control"></div>
    </div>
    <div class="send-main">
      <ul class="mine-double-line" style="padding: 15px">
        <li>
          <div>批量设置</div>
          <div>
            <div>
              <!-- v-model="" -->
              <van-checkbox style="background: #fff; padding: 10px" v-model="checked"
                >全选学生</van-checkbox
              >
            </div>
          </div>
        </li>
        <li>
          <div>学生选择</div>
          <div style="overflow-y: auto; height: 250px">
            <van-checkbox
              v-model="checked"
              style="background: #fff; padding: 10px"
              >王朋坤</van-checkbox
            >
            <van-checkbox
              v-model="checked"
              style="background: #fff; padding: 10px"
              >王朋坤</van-checkbox
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="send-footer">确认选择</div>
  </div>
</template>

<script>
import {Checkbox, CheckboxGroup } from "vant";
export default {
  data() {
    return {
      checked: true
    }
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
};
</script>