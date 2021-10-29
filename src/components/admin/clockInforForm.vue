<!--
 * @Author: your name
 * @Date: 2021-10-29 14:00:45
 * @LastEditTime: 2021-10-29 14:43:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/admin/clockInforForm.vue
-->

<template>
  <div class="clockInforForm">
    <ul class="mine-double-line">
      <li>
        <div>打卡地点选择</div>
        <select
          class="mine-select-custom"
          v-model="publishTask.param.placename"
        >
          <option disabled value="请选择地点">请选择</option>
          <option
            v-for="item in publishTask.formData.placename"
            :key="item.key"
            value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </li>
      <li>
        <div>打卡开始时间</div>
        <div class="mine-single-line-three" @click="showStartTimePopup">
          <div>时间</div>
          <div>{{ publishTask.param.starttime }}</div>
          <div>图标</div>
        </div>
      </li>
      <li>
        <div>打卡结束时间</div>
        <div class="mine-single-line-three" @click="showEndTimePopup">
          <div>时间</div>
          <div>{{ publishTask.param.endtime }}</div>
          <div>图标</div>
        </div>
      </li>
      <li>
        <div>定位容错半径</div>
        <van-slider
          v-model="publishTask.param.radius"
          active-color="#ee0a24"
          step="20"
          inactive-color="#8DB6C2"
        >
          <template #button>
            <div class="custom-button">
              {{ publishTask.param.radius + "米" }}
            </div>
          </template>
        </van-slider>
      </li>
      <li>
        <div>备注</div>
        <input
          type="text"
          style="
            border: 1px solid gray;
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            border-radius: 5px;
          "
          placeholder="可填写本次打卡主题"
        />
      </li>
      <!-- 获取开始时间控件 -->
      <van-popup
        v-model="publishTask.formData.starttime.showDate"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-datetime-picker
          v-model="publishTask.formData.currentDate"
          type="datetime"
          title="选择完整时间"
          swipe-duration="0"
          visible-item-count="3"
          @confirm="starttimeData"
        />
      </van-popup>
      <!-- 获取结束时间控件 -->
      <van-popup
        v-model="publishTask.formData.endtime.showDate"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-datetime-picker
          v-model="publishTask.formData.currentDate"
          type="datetime"
          title="选择完整时间"
          swipe-duration="0"
          visible-item-count="3"
          @confirm="endtimeData"
        />
      </van-popup>
    </ul>
    <div class="mine-button-block" style="position: sticky; bottom: 5px">
      下一步
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Slider, Checkbox, CheckboxGroup } from "vant";
import axios from "axios";

export default {
  data() {
    return {
      publishTask: {
        param: {
          radius: 1,
          placename: "",
          user_username: "",
          starttime: this.convertDate(new Date()),
          endtime: this.convertDate(new Date()),
          content: "",
        },
        formData: {
          placename: [],
          starttime: {
            showDate: false,
            currentDate: new Date(),
          },
          endtime: {
            showDate: false,
          },
          currentDate: new Date(),
        },
        currentDate: new Date(),
      },
    };
  },
  methods: {
    showStartTimePopup() {
      this.publishTask.formData.starttime.showDate = true;
    },
    showEndTimePopup() {
      this.publishTask.formData.endtime.showDate = true;
    },
    convertDate(Date) {
      const date = Date;
      const dateString =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        " " +
        (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
        ":" +
        (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes());
      //  +  ":"  + "00";
      console.log(
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      );
      console.log(
        date.getDate() + 1 > 9 ? date.getDate() + 1 : "0" + (date.getDate() + 1)
      );

      return dateString;
    },
    endtimeData(time) {
      console.log(time);
      this.publishTask.param.endtime = this.convertDate(time);
      this.publishTask.formData.endtime.showDate = false;
    },
    starttimeData(time) {
      console.log(time);
      this.publishTask.param.starttime = this.convertDate(time);
      this.publishTask.formData.starttime.showDate = false;
    },
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  mounted() {
    // 打卡信息数据初始化
    const initPositionData = JSON.parse(
      window.localStorage.getItem("initPositionData")
    );
    const initItems = initPositionData.features.filter((item) => {
      return item.properties.Name && item.properties.Name != " ";
    });
    let initItemsName = [];
    initItems.map((item) => {
      initItemsName.push({
        key: item.properties.Name,
        name: item.properties.Name,
      });
    });
    this.publishTask.formData.placename = initItemsName;

    console.log(this.convertDate(new Date()));
  }
};
</script>

<style lang="scss" scoped>
.custom-button {
  width: 30px;
  color: #fff;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
  margin-left: 20px;
}
</style>