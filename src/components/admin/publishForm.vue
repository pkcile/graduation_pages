<!--
 * @Author: your name
 * @Date: 2021-10-26 09:27:48
 * @LastEditTime: 2021-10-26 18:23:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/publishForm.vue
-->
<template>
  <ul class="publishForm mine-double-line">
    <li>
      <div>定位容错半径</div>
      <van-slider v-model="value" active-color="#ee0a24" step="10" inactive-color="#8DB6C2">
        <template #button>
          <div class="custom-button">{{ value + "米" }}</div>
        </template>
      </van-slider>
    </li>
    <li>
      <div>打卡开始时间</div>
      <div class="mine-single-line-three"  @click="showPopup">
        <div >时间</div>
        <div>2021-10-26 09:27:48</div>
        <div>图标</div>  
      </div>
    </li>
    <li>
      <div>打卡结束时间</div>
      <div class="mine-single-line-three"  @click="showPopup">
        <div >时间</div>
        <div>2021-10-26 09:27:48</div>
        <div>图标</div>  
      </div>
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
</template>

<script>
import { DatetimePicker, Popup, Slider } from "vant";

export default {
  data() {
    return {
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
  },
};
</script>

<style lang="scss" scoped>
/* 上下表单 */
.mine-double-line {
  background: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // border-bottom: 1px solid #f00;
  overflow-y: auto;
  & > li {
    margin: 10px 0;
    padding: 0 0;
    border-bottom: 1px solid #EFEFF3;
  }
  & > li > div:nth-of-type(1) {
    margin: 10px 0 15px 0;
    // color: #111;
    color: #555;
  }

  & > li > :not(div:nth-of-type(1)) {
    // margin: 0 0 15px 0;
     margin-bottom: 15px;
  }
}

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
    flex: 0 0 50px;
    color: #555
  }
  & > div:nth-of-type(2) {
    flex: 1 1 150px;
    color: #444;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 50px;
  }
}

.publishForm {
  padding: 20px;
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
</style>