<!--
 * @Author: 王朋坤
 * @Date: 2022-03-27 20:44:59
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-21 14:58:14
 * @FilePath: /graduation-project-master/src/pages/publish/date.vue
 * @Description: 
-->
<template>
  <div
    class="social-page send-part-message"
    style="z-index: 2; background: #efeff3"
  >
    <div class="title">
      <div
        class="control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="backTo"
      ></div>
      <div class="text">打卡主题</div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
        }"
        @click="initSendMessage"
      ></div>
    </div>

    <div
      style="
        background: #efeff3;
        padding: 0 10px 10px 10px;
        height: calc(100% - 50px);
        overflow-y: auto;
      "
    >
      <div class="mine-double-line-date">
        <div class="title">
          <div>日期选择</div>
        </div>
        <div class="main">
          <van-cell title="可选择多个" :value="text" @click="show = true" />
          <van-calendar v-model="show" type="multiple" @confirm="onConfirm" />
        </div>
      </div>

      <div class="mine-double-line-date">
        <div class="title">
          <div>时间段选择</div>
          <div style="color: #007aff" @click="addHourTime">时间段添加</div>
        </div>
        <div
          class="main"
          style="background: #fff; border-radius: 5px; overflow-y: auto"
        >
          <div
            class="mine-single-line-three"
            @click="showEndTimePopup(getHourItem)"
            style="
              border: #8080802e 0px solid;
              border-bottom: #8080802e 1px solid;
            "
            v-for="getHourItem in getHours"
            v-bind:key="getHourItem.id"
          >
            <div>时间点</div>
            <div>{{ getHourItem.currentHour }}</div>
            <div>
              <van-icon name="cross" @click="removeHourItem(getHourItem)" />
            </div>
          </div>
          <!-- <div class="mine-single-line-three" @click="showEndTimePopup" >
            <div>时间</div>
            <div>{{ getHours[1].currentHour }}</div>
            <div><van-icon name="arrow" /></div>
          </div> -->
          <van-popup
            v-model="showDate"
            position="bottom"
            :style="{ height: '30%' }"
          >
            <van-datetime-picker
              v-model="currentHour"
              type="time"
              title="选择完整时间"
              swipe-duration="0"
              visible-item-count="3"
              @confirm="endtimeData"
              @cancel="onConcelHour"
            />
          </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, Cell, CellGroup, DatetimePicker, Icon, Popup } from "vant";
import axios from "axios";

export default {
  components: {
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  props: {
    inputcomponentData: String,
  },
  data() {
    return {
      inputData: "",
      text: "",
      show: false,
      showDate: false,
      getHours: [
        {
          id: 1,
          currentHour: "8:00",
        },
      ],
      getHoursIndex: null,
      getDays: [],
      currentHour: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };
  },
  mounted() {},
  methods: {
    backTo() {
      this.$parent.datecomponentControl = false;
    },
    initSendMessage() {
      const getHoursSet = new Set();
      this.getHours.forEach((item) => {
        getHoursSet.add(item.currentHour);
      });

      let dateStamps = [];
      for (const getHoursitem of getHoursSet) {
        let hm = String(getHoursitem).split(":");
        this.getDays.forEach((dayitem) => {
          dayitem.setHours(parseInt(hm[0]));
          dayitem.setMinutes(parseInt(hm[1]));
          dayitem.setSeconds(0);

          dateStamps.push({
            startstamp: Date.parse(dayitem),
          });
        });
      }
      this.$parent.pageData.datecomponentData = dateStamps;
      console.log(this.$parent.pageData.datecomponentData);
      this.$parent.datecomponentControl = false;
    },
    onConfirm(date) {
      console.log(date);
      this.getDays = date;
      this.show = false;
      this.text = `选择了 ${date.length} 个日期`;
    },
    endtimeData(time) {
      console.log(time);
      this.getHours.map((item, index) => {
        if (item.id == this.getHoursIndex) {
          item.currentHour = time;
        }
      });
      this.showDate = false;
    },
    showEndTimePopup(hourItem) {
      console.log(hourItem);
      this.getHoursIndex = hourItem.id;
      this.showDate = true;
    },
    onConcelHour() {
      this.showDate = false;
    },
    addHourTime() {
      this.getHours.push({
        currentHour: `${new Date().getHours()}:${new Date().getMinutes()}`,
        id: Date.now(),
      });
    },
    removeHourItem(hourItem) {
      console.log(hourItem);
      console.log(hourItem.id);
      this.getHours = this.getHours.filter((item, index) => {
        return item.id != hourItem.id;
      });

      window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
    },
  },
};
</script>

<style lang="scss" scoped>
.mine-double-line-date {
}

.send-part-message {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 2;
  textarea {
    resize: none;
    width: 100%;
    box-sizing: border-box;
    border-width: 0;
    padding: 20px;
  }
  & > .title {
    // position: relative;
    background: rgba(255, 255, 255, 0);
    height: 50px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // width: 100%    text-align: center;
    .control {
      width: 50px;
      height: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
    }
    .text {
      flex: 1 0 100px;
    }
    .right {
      width: 50px;
      height: 100%;
      right: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
    }
  }
  & > .main {
    background: #fff;
    height: calc(100% - 50px);
    width: 100%;
    overflow-y: auto;
    position: relative;
    textarea {
      height: 200px;
    }
  }
}
.social-page {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
  background: #f1f1f4;
  z-index: 0;
  & > .title {
    position: relative;
    background: #f7f7f7;
    height: 50px;
    top: 0;
    // z-index: 1;
    width: 100%;
    text-align: center;
    .control {
      position: absolute;
      width: 50px;
      height: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-position: center;
      // background-size: 50%;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .right {
      position: absolute;
      width: 50px;
      height: 100%;
      right: 0;
      top: 0;
      height: 100%;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
    }
  }
  & > .main {
    background: #fff;
    height: calc(100% - 50px);
    width: 100%;
    overflow-y: auto;
    // position: absolute;
    // z-index: 0;
    .background-img {
      margin-bottom: 50px;
      height: 150px;
      width: 100%;
      position: relative;
      background-size: cover;
      background-repeat: repeat-x;
    }
    .user-infor {
      position: absolute;
      right: 0;
      bottom: -25px;
      width: 120px;
      height: 50px;
      // border: 1px solid red;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      .name {
        flex: 1 0 50px;
      }
      .img {
        height: 50px;
        flex: 0 0 55px;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 9%;
      }
    }
  }
}

.social-state-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  div {
    line-height: 25px;
    font-size: 16px;
  }
  .user-img {
    flex: 0 0 50px;
    height: 50px;
    background: #bbb;
    margin-left: 12px;
    background-size: contain;
    border-radius: 9%;
  }
  .user-main {
    flex: 1 1 50px;
    padding-left: 5px;
    .user-name {
      color: blue;
    }
    .user-status {
      color: #999;
      div {
        font-size: 14px;
      }
      // .location {
      // }
      .time {
        display: flex;
      }
    }
  }
}

.mine-double-line-date {
  & > .title {
    margin: 15px auto 5px auto;
    padding: 7px;
    display: flex;
    & > div:nth-of-type(1) {
      flex: 1 1 100px;
    }
    & > div:nth-of-type(2) {
      flex: 0 0 100px;
      text-align: right;
    }
  }

  & > .main {
  }

  .van-cell {
    border-radius: 5px;
  }
}
</style>