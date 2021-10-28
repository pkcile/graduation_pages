<!--
 * @Author: your name
 * @Date: 2021-10-26 09:27:48
 * @LastEditTime: 2021-10-28 11:00:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/publishForm.vue
-->
<template>
  <div class="publishForm">
    <ul class="mine-double-line">
      <!-- 地点选择 -->
      <li>
        <div>打卡地点选择</div>
        <select class="mine-select-custom">
          <option value="001">地点选择</option>
          <option value="002">002</option>
          <option value="003">003</option>
        </select>
      </li>
      <!-- 开始时间 -->
      <li>
        <div>打卡开始时间</div>
        <div class="mine-single-line-three" @click="showPopup">
          <div>时间</div>
          <div>2021-10-26 09:27:48</div>
          <div>图标</div>
        </div>
      </li>
      <!-- 结束时间 -->
      <li>
        <div>打卡结束时间</div>
        <div class="mine-single-line-three" @click="showPopup">
          <div>时间</div>
          <div>2021-10-26 09:27:48</div>
          <div>图标</div>
        </div>
      </li>
      <!-- 定位半径 -->
      <li>
        <div>定位容错半径</div>
        <van-slider
          v-model="value"
          active-color="#ee0a24"
          step="20"
          inactive-color="#8DB6C2"
        >
          <template #button>
            <div class="custom-button">{{ value + "米" }}</div>
          </template>
        </van-slider>
      </li>

      <!-- 获取时间控件 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :min-date="minDate"
          :max-date="maxDate"
          swipe-duration="0"
          :style="{ height: '244px' }"
          visible-item-count="3"
          @confirm="test001"
        />
      </van-popup>
    </ul>
    <div class="mine-button-block" style="position: sticky; bottom: 5px">
      下一步
    </div>
    <!-- 人员选择窗口 -->
    <div
      class="mine-send-part-absolute"
      v-bind:class="{ 'send-part-control': false }"
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
                <van-checkbox
                  v-model="checked"
                  style="background: #fff; padding: 10px"
                  >全选学生</van-checkbox
                >
              </div>
            </div>
          </li>
          <li>
            <div>学生选择</div>
            <div style=" overflow-y: auto;height: 250px;">
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
  </div>
</template>

<script>
import {
  DatetimePicker,
  Popup,
  Slider,
  Step,
  Steps,
  Checkbox,
  CheckboxGroup,
} from "vant";

export default {
  data() {
    return {
      checked: true,
      value: 11,
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
    confirm() {
      console.log("666");
    },
    test001(time) {
      this.show = false; // 获取时间成功提示
      console.log(time.getDate());
      console.log(new Date());
    },
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
};
</script>

<style lang="scss" scoped>
.publishForm {
  background: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/* 上下表单 */
.mine-double-line {
  padding: 20px;
  & > li {
    margin: 10px 0;
    padding: 0 0;
    border-bottom: 1px solid #efeff3;
  }

  & > li > div:nth-of-type(1) {
    margin: 10px 0 15px 0;
    color: #555;
  }

  & > li > :not(div:nth-of-type(1)) {
    margin-bottom: 15px;
  }
}

/* 单行三个元素 */
.mine-single-line-three {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  // background: #f5f5fa;
  // background: #f5f5f5;
  // border: rgba(128, 0, 128, 0.164) 1px solid;
  border: gray 1px solid;
  padding: 10px 8px;
  border-radius: 5px;
  & > div:nth-of-type(1) {
    flex: 0 0 60px;
    padding-left: 10px;
    color: #555;
  }
  & > div:nth-of-type(2) {
    flex: 1 1 150px;
    // color: #444;
    color: #555;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
    color: #555;
  }
}

/* 选择 */
.mine-select-custom {
  width: 100%;
  height: 40px;
  padding: 5px 0 5px 10px;
  border: 1px solid gray;
  border-radius: 5px;
  color: #555555;
  background: #fff;
}

.custom-button {
  width: 30px;
  color: #fff;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}

/* 弹出组件样式 */
.mine-send-part-absolute {
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  left: 0%;
  top: 0%;
  background: #f1f1f4;
  // background: #fff;
  z-index: 0;
  .send-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: 500;
    font-size: 17px;
    position: relative;
    background: #f7f7f7;
    .send-control {
      position: absolute;
      right: 50;
      top: 0;
      width: 50px;
      height: 100%;
    }
  }
  .send-main {
    width: 100%;
    height: calc(100% - 126px);
    overflow-y: auto;
  }
  .send-footer {
    height: 56px;
    line-height: 56px;
    text-align: center;
    background: #007aff;
    color: white;
    margin: 0 5px;
    border-radius: 5px;
  }
}

.send-part-control {
  display: none;
}
</style>