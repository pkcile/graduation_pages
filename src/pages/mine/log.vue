<!--
 * @Author: 王朋坤
 * @Date: 2022-04-20 22:04:29
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-24 00:35:15
 * @FilePath: /graduation-project-master/src/pages/mine/log.vue
 * @Description: 日志
-->

<template>
  <div class="page-absolute">
    <div class="title">
      <div
        class="control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"
        @click="controlback"
      ></div>
      <div class="text">打卡日志</div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
          display: 'none',
        }"
      ></div>
    </div>
    <div class="main">
      <div class="log-title">
        <div @click="openDate">{{ pageData.titleDate }}</div>
        <div @click="openDate">icon</div>
        <div>统计</div>
      </div>
      <div class="log-main">
        <div
          class="log-item"
          v-for="item in pageData.maintaskitems"
          v-bind:key="item.key"
        >
          <div>{{ item.dateHourText }}</div>
          <div
            v-bind:class="{
              red: item.statusmark == -1,
              blue: item.statusmark == 1,
              yellow: item.statusmark == 0,
            }"
          >
            {{ item.statusText }}
          </div>
        </div>
        <van-popup
          v-model="showpopup"
          position="bottom"
          :style="{ height: '50%' }"
        >
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :min-date="minDate"
            :formatter="formatter"
            visible-item-count="6"
            @confirm="dateMonthConfirm"
            @cancel="dateMonthCancel"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.log-title {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eee;
  background: #fff;
  border-radius: 5px;
  padding: 5px 15px;
  & > div:nth-of-type(1) {
    flex: 0 1 100px;
  }
  & > div:nth-of-type(2) {
    flex: 9 0 50px;
    opacity: 0;
  }
  & > div:nth-of-type(3) {
    flex: 0 0 70px;
  }

  & > div:nth-of-type(1):hover,
  & > div:nth-of-type(2):hover {
    color: #00f;
  }
}

.log-title:hover {
  background: #eee;
}

.log-main {
  height: calc(100% - 50px);
  overflow: auto;
  // padding: 5px 15px;
}
.log-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eee;
  padding: 5px 15px;
  & > div:nth-of-type(1) {
    flex: 1 1 100px;
  }
  & > div:nth-of-type(2) {
    flex: 0 0 100px;
  }

  .red {
    color: #f00;
    cursor: pointer;
  }
  .yellow {
    color: #000;
    cursor: pointer;
  }
  .blue {
    color: #00f;
    cursor: pointer;
  }
}
.log-item:hover,
.log-item:active {
  background: #eee;
}

// .log-item:last-of-type {
//     border-bottom: 1px solid #f00;
// }
.page-absolute {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  z-index: 2;
  top: 0;

  & > .title {
    background: #f1f1f4;
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
      background-size: 100%;
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
    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
    // padding: 10px;
    position: relative;
  }
}
</style>

<script>
import {
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  ActionSheet,
  DatetimePicker,
  Popup,
} from "vant";
import L from "leaflet";
import { getCurrentLocation2 } from "@/utils/geolocation.js";
import { geometry, point } from "@turf/helpers";
import searchview from "@/components/search.vue";
import {
  convertDate,
  convertMonthDate,
  convertDateHour,
  getMonthDay,
} from "@/utils/date.js";
import { getResultClockLog } from "@/api/mine/index.js";
export default {
  name: "mapapp",
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    searchview: searchview,
  },
  data() {
    return {
      minDate: new Date(2018, 8, 30),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      result: [],
      showpopup: false,
      pageData: {
        titleDate: null,
        maintaskitems: [],
      },
    };
  },
  created() {
    // this.pageData.titleDate = convertMonthDate();
    // this.dateMonthQuery(new Date());
    // getResultClockLog({
    //   studynth: this.$store.state.User.login.userinformation.studynth,
    //   currentStamp: new Date(),
    // }).then((returnData) => {
    //   if (returnData?.data?.result?.length) {
    //     this.$toast("共计" + returnData?.data?.result?.length + "条打卡数据");
    //     function preprocessingDatalogs(datalogs) {
    //       // 排序
    //       datalogs.sort((a, b) => {
    //         return b.startstamp - a.startstamp;
    //       });
    //       // 预处理时间显示
    //       datalogs.map((item) => {
    //         item.dateHourText = convertDateHour(item.startstamp);
    //         item.key = Math.random() + Date.now() + "";
    //       });
    //       // 预处理结果显示
    //       datalogs.map((item) => {
    //         if (item.statusmark === 0) {
    //           item.statusText = "未打卡";
    //         } else if (item.statusmark == 1) {
    //           item.statusText = "打卡成功";
    //         } else if (item.statusmark == -1) {
    //           item.statusText = "打卡失败";
    //         } else {
    //           item.statusText = "未知情况";
    //         }
    //       });

    //       return datalogs;
    //     }

    //     let datalogs = returnData.data.result;

    //     this.pageData.maintaskitems = preprocessingDatalogs(datalogs);
    //   } else {
    //     this.$toast("无查询结果");
    //   }
    // });
  },
  mounted() {},
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    dateMonthConfirm(dateObject) {
      console.log("confirm", dateObject);
      this.showpopup = false;
      this.pageData.titleDate = convertMonthDate(dateObject);
      this.dateMonthQuery(dateObject);
    },
    dateMonthCancel() {
      this.showpopup = false;
    },
    openDate() {
      this.showpopup = true;
    },
    dateMonthQuery(dateobj) {
      getResultClockLog({
        studynth: this.$store.state.User.login.userinformation.studynth,
        currentStamp: dateobj,
      }).then((returnData) => {
        if (returnData?.data?.result?.length) {
          this.$toast(convertMonthDate(dateobj) + "共计" + returnData?.data?.result?.length + "条打卡数据");
          function preprocessingDatalogs(datalogs) {
            // 排序
            datalogs.sort((a, b) => {
              return b.startstamp - a.startstamp;
            });
            // 预处理时间显示
            datalogs.map((item, index) => {
              item.dateHourText = convertDateHour(item.startstamp);
              item.key = Math.random() + index + "";
            });
            // 预处理结果显示
            datalogs.map((item) => {
              if (item.statusmark === 0) {
                item.statusText = "未打卡";
              } else if (item.statusmark == 1) {
                item.statusText = "打卡成功";
              } else if (item.statusmark == -1) {
                item.statusText = "打卡失败";
              } else {
                item.statusText = "未知情况";
              }
            });

            return datalogs;
          }

          let datalogs = returnData.data.result;

          this.pageData.maintaskitems = preprocessingDatalogs(datalogs);
        } else {
          this.$toast("无查询结果");
          this.pageData.maintaskitems = [];
        }
      });
    },
    initCurrentTime() {
      this.pageData.titleDate = convertMonthDate();
      this.dateMonthQuery(new Date());
      this.$parent.logcomponentControl = true;
    },
    controlback() {
      this.$parent.logcomponentControl = false;
    }
  },
};
</script>


