<!--
 * @Author: 王朋坤
 * @Date: 2022-04-20 22:04:29
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-21 09:08:16
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
      ></div>
      <div class="text">打卡日志</div>
      <div
        class="right"
        :style="{
          'background-image': `url(${require('@/assets/font/save.svg')})`,
          'display': 'none'
        }"
      ></div>
    </div>
    <div class="main" >
      <div class="log-title">
        <div @click="openDate">2022年04月</div>
        <div @click="openDate">icon</div>
        <div>统计</div>
      </div>
      <div class="log-main">
        <div class="log-item">
          <div>4-20 12:00</div>
          <div>打卡成功</div>
        </div>
        <div class="log-item">
          <div>4-20 12:00</div>
          <div>打卡失败</div>
        </div>


    <van-popup v-model="showpopup" position="bottom" :style="{ height: '45%' }" > 
      <van-datetime-picker
      v-model="currentDate"
      type="year-month"
      title="选择年月"
      :min-date="minDate"
      :formatter="formatter"
      visible-item-count="6"
      @confirm="dateMonthConfirm"
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
  padding: 5px;
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

}

.log-title:hover {
  background: #eee;
}

.log-main {
  height: calc(100% - 50px);
  overflow: auto;
  padding: 5px;
}
.log-item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eee;
  & > div:nth-of-type(1) {
    flex: 1 1 100px;
  }
  & > div:nth-of-type(2) {
    flex: 0 0 100px;
  }

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
    padding: 10px;
    position: relative;
  }
}

</style>

<script>
import { Checkbox, CheckboxGroup, Cell, CellGroup, ActionSheet, DatetimePicker, Popup} from "vant";
import L from "leaflet";
import { getCurrentLocation2 } from "@/utils/geolocation.js";
import { geometry, point } from "@turf/helpers";
import searchview from "@/components/search.vue";
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
      layersControl: [
        {
          id: 1,
          name: "遥感底图",
          checked: false,
          type: "imagery",
        },
        {
          id: 5,
          name: "项目定位",
          checked: false,
          type: "location",
          defaultLocation: [113.330962, 23.111983],
        },
      ],
      map: null,
      layer: {
        image: null,
        vector: null,
        cva: null,
      },
      longitude: 115.9968,
      latitude: 28.5636,
      show: false,
      actions: [
        {
          name: "100m",
          value: 100,
        },
        {
          name: "200m",
          value: 200,
        },
        {
          name: "500m",
          value: 500,
        },
        {
          name: "1000m",
          value: 1000,
        },
        {
          name: "2000m",
          value: 20000,
        },
        {
          name: "5000m",
          value: 50000,
        },
        {
          name: "10000m",
          value: 10000,
        },
      ],
      radius: 200,
      editplacesBool: false,
      placeitem: null,
    };
  },
  created() {},
  mounted() {
    console.log("mounted");
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    dateMonthConfirm(data) {

      console.log("confirm", data);
      this.showpopup = false;
    },
    openDate() {
      this.showpopup = true;
    }
  },
};
</script>


