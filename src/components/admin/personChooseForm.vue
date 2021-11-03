<!--
 * @Author: your name
 * @Date: 2021-10-29 14:33:06
 * @LastEditTime: 2021-11-02 18:31:27
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
      <div class="send-control" :style="{'background-image': `url(${require('@/assets/font/arrow-left.svg')})`}"></div>
    </div>
    <div class="send-main">
      <ul class="mine-double-line" style="padding: 10px">
        <li>
          <div>批量设置</div>
          <div>
            <div>
              <van-checkbox
                style="background: #fff; padding: 10px"
                v-model="checked"
                @click="allSelectChoosed"
                >全选学生</van-checkbox
              >
            </div>
          </div>
        </li>
        <li>
          <div>学生选择</div>
          <div style="overflow-y: auto; height: 250px">
            <van-checkbox
              v-for="item in studentData"
              v-bind:key="item.username"
              v-model="item.checked"
              style="background: #fff; padding: 10px"
              >{{ item.name }}</van-checkbox
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="send-footer" @click="forSureStudents">确认选择</div>
  </div>
</template> 

<script>
import axios from "axios";
import { Checkbox, CheckboxGroup } from "vant";
export default {
  data() {
    return {
      checked: false,
      studentData: [
        {
          name: "测试姓名",
          checked: false,
          username: 'guest',
          id: "guest",
        }
      ],
    };
  },
  methods: {
    forSureStudents() {
      this.$emit("open-person-data-send", this.studentData);
      console.log(this.$parent.form);
      this.$parent.form.test0012 = 1234;
      console.log(this.$parent.form);
      // this.$parent.test001();
    },
    allSelectChoosed() {
      const checked = this.checked;
      const _this = this;
      if (checked) {
        _this.studentData.map((item) => {
          item.checked = true;
        });
      } else {
        _this.studentData.map((item) => {
          item.checked = false;
        });
      }
      console.log(_this.studentData);
    },
  },
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  mounted() {
    const _this = this;
    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/queryStudent`)
      .then(function (returnData) {
        console.log(returnData.data);
        returnData.data.queryStudent.map((item) => {
          _this.studentData.push({name: item.name , username: item.username, checked: false, id: item.username});
        })
        
      });
  },
};
</script>