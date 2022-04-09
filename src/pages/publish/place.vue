<!--
 * @Author: 王朋坤
 * @Date: 2022-03-27 20:46:04
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-09 11:34:24
 * @FilePath: /graduation-project-master/src/pages/publish/place.vue
 * @Description: 
-->
<template>
  <div
    class="social-page send-part-message"
    style="z-index: 2; background: #efeff3"
  >
    <mapcomponent v-show="mapcomponentControl" ref="mapcomponentref" @updateplaces="updatePlaces"></mapcomponent>
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
    <div style="background: #efeff3;box-sizing:border-radius;height:calc(100% - 50px);overflow-y:auto;">
      <div class="mine-double-line-date">
        <div class="title">
          <div>地点选择</div>
        </div>
        <div class="main">
          <van-cell
            is-link
            title="打卡地点"
            :value="serverplacename"
            @click="show = true"
          />
          <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            style=""
          />
        </div>
      </div>

      <div class="mine-double-line-date">
        <div class="title">
          <div>扩展地点</div>
          <div style="color: #007aff" @click="addHourTime">地点添加</div>
        </div>
        <div class="main" style="background:#fff;border-radius:5px;overflow-y:auto;">
          <div class="mine-single-line-three" @click="showEndTimePopup(getPositionItem)" style="border: #8080802e 0px solid;border-bottom: #8080802e 1px solid;" v-for="getPositionItem in getPosition" v-bind:key="getPositionItem.id">
            <div>地点</div>
            <div>{{ Number(getPositionItem.geometry.coordinates[0]).toFixed(2) + "," + Number(getPositionItem.geometry.coordinates[1]).toFixed(2) + "&nbsp;&nbsp;&nbsp;" + getPositionItem.radius + "米" }}</div>
            <div><van-icon name="cross"  @click="removeHourItem(getPositionItem)"/></div>
          </div>
        </div>

      </div>
    </div>    
  </div>
</template>

<script>
import { Calendar, Cell, CellGroup, DatetimePicker, Icon, Popup,ActionSheet } from "vant";
import axios from "axios";
import mapcomponent from "./map.vue"
export default {
  name: "place",
  components: {
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [ActionSheet.name]: ActionSheet,
    mapcomponent: mapcomponent
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
      getPosition: [
        // {
        //   id: 1,
        //   geometry: {
        //     coordinates: [112, 113],
        //     type: "Point",
        //   },
        //   radius: 100
        // }
      ],
      getPositionIndex: null,
      getDays: [],
      mapcomponentControl: false,
      actions: [
        {
          name: "选择为空",
          value: null,
        },
        {
          name: "整个服务",
          value: "整个服务",
        }
      ],
      serverplacename: ""
    };
  },
  mounted() {},
  methods: {
    backTo() {
      this.$parent.placecomponentControl = false;
    },
    initSendMessage() {
      this.$parent.pageData.placecomponentData = this.getPosition;
      this.$parent.placecomponentControl = false;
    },
    showEndTimePopup(positionItem) {
      console.log(positionItem);
      this.mapcomponentControl = true;
      this.$refs["mapcomponentref"].editplaces(positionItem);
    },
    onConcelHour() {
      this.showDate = false;
    },
    addHourTime() {
      this.mapcomponentControl = true;
      this.$refs["mapcomponentref"].init();
    },
    updatePlaces() {
      console.log("开始更新指令");
      this.$parent.placecomponentData = this.getPosition;
      console.log(this.$parent.placecomponentData);

    },
    removeHourItem(positionItem) {
      // 移除单个任务
      this.getPosition = this.getPosition.filter((item, index) => {
        return item.id != positionItem.id;
      })

      window.event? window.event.cancelBubble = true : e.stopPropagation();
    },
    onSelect(item) {
      this.show = false;
      this.serverplacename = item.value;
      
      this.$parent.pageData.serverplacename = item.value;
      console.log(this.$parent.pageData.serverplacename);
    }
  },
};
</script>

<style lang="scss" scoped>
.mine-double-line-date {
}

.send-part-message {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 2;
  top: 0;
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