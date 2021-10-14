<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-10-13 18:30:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /江西师大学生位置签到管理系统/graduation-project/page-view/src/components/main/main.vue
-->

<template>
  <div class="home-main">
    <!-- 表单 -->
    <ul class="mine-form-display" style="">
      <li>
        <span>坐标定位</span>
        <span>定位精度</span>
      </li>
      <li>
        <span>坐标定位</span>
        <span>定位精度</span>
      </li>
      <li>
        <span>坐标定位</span>
        <span>定位精度</span>
      </li>
      <li style="background: #efeff3"><span>备注</span></li>
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="请详细描述你的问题和意见..."
      ></textarea>
    </ul>
    <!-- 按钮 -->
    <div class="mine-button-block" v-on:click="getCurrentLocation">
      获取定位
    </div>
    <div
      class="mine-button-block mine-button-red"
      v-on:click="changeSendPartControl"
    >
      查看
    </div>
    <!-- 弹窗 -->
    <div
      class="send-part"
      v-bind:class="{ 'send-part-control': sendPart.control }"
    >
      <div class="send-title">
        标题
        <div class="send-control" v-on:click="changeSendPartControl"></div>
      </div>
      <div class="send-main" id="viewDiv"></div>
      <div class="send-footer" @click="analyseAndSend">发送</div>
    </div>
  </div>
</template>

<script>

import initArcGIS from "@/map/arcgis/init.js";
import GeolocationShow from "@/map/arcgis/GeolocationShow.js";
import AnalysePosition from "@/map/arcgis/AnalysePosition.js";
import "@arcgis/core/assets/esri/themes/dark/main.css";

export default {
  name: "test001",
  data() {
    return {
      sendPart: {
        control: true,
      },
      getCurrentLocationData: {
        control: false,
        nth: 0,
        max: 5,
        locationItem: null,
      },
      esriMap: {
        containerId: "viewDiv",
        // 地图入口
        view: null,
        map: null,
        defaultConfig: {
          initPointXY: [116.02685261188525, 28.683314800285213],
          initZoomLevel: 15,
        },
      },
    };
  },
  mounted() {
    const arcgis = new initArcGIS(
      this.esriMap.containerId,
      this.esriMap.defaultConfig
    );
    this.esriMap.map = arcgis.map;
    this.esriMap.view = arcgis.view;
  },
  methods: {
    // 弹窗显示控制
    changeSendPartControl() {
      this.sendPart.control = !this.sendPart.control;
    },
    // 获取当前位置
    getCurrentLocation() {
      // 控件配置
      let { _this, control, nth, max, getCurrentLocationJudge } = {
        _this: this,
        control: this.getCurrentLocationData.control,
        nth: this.getCurrentLocationData.nth,
        max: this.getCurrentLocationData.max,
        getCurrentLocationJudge: 0,
      };
      const view = this.esriMap.view;

      // 状态判断
      if (control == false || (control == true && nth <= max)) {
        getCurrentLocationJudge = 1;
      }

      // 进行定位
      if (getCurrentLocationJudge) {
        // 修改状态
        _this.getCurrentLocationData.control = true;
        _this.getCurrentLocationData.nth++;
        console.log(view);
        // 获取定位信息
        new GeolocationShow(view).then(function (data) {
          _this.getCurrentLocationData.locationItem = data;
        });
      } else {
        console.log("请稍后再试试");
      }
    },
    // 分析结果、发送数据
    analyseAndSend() {
      const view = this.esriMap.view;
      const map = this.esriMap.map;
      const locationCoords = this.getCurrentLocationData?.locationItem?.geometry?.coordinates;
      const queryParamConfig = {
        bufferDistance: "500",
        whereParamField: "Name",
        whereParamValue: "'惟义楼'" 
      };

      if (1) {
        new AnalysePosition(map, view, locationCoords, queryParamConfig);
        // AnalysePosition(map, view, locationCoords, queryParamConfig)();
     }
    },
  },
  components: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.home-main {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}
// 弹出组件样式
.send-part {
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  left: 0%;
  top: 0%;
  background: #f1f1f4;
  z-index: 0;
  .send-title {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-weight: 500;
    font-size: 17px;
    position: relative;
    .send-control {
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      height: 100%;
      background: #bfa;
    }
  }
  .send-main {
    width: 100%;
    height: calc(100% - 100px);
    // background: #bfa;
  }
  .send-footer {
    width: 100%;
    height: 56px;
    line-height: 56px;
    box-sizing: border-box;
    text-align: center;
  }
}

.send-part-control {
  display: none;
}

// 表单样式
.mine-form-display {
  background: #fff;
  li {
    display: flex;
    padding: 11px 15px;
    height: 50px;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #efeff3;
  }
  li > span:nth-child(1) {
    flex: 0 0 100px;
  }
  li > span:nth-child(2) {
    flex: 2 1 200px;
  }
  textarea {
    border-width: 0;
    width: 100%;
    padding: 10px;
  }
}

// 按钮样式
.mine-button-style {
  display: inline-block;
  line-height: 40px;
  padding: 8px;
  background: #017aff;
  color: white;
  text-align: center;
  border-radius: 5px;
  width: 100px;
  margin: 5px auto;
}

.mine-button-block {
  display: block;
  line-height: 40px;
  padding: 8px;
  background: #017aff;
  color: white;
  text-align: center;
  border-radius: 5px;
  width: calc(100% - 25px);
  margin: 8px auto;
}

.mine-button-red {
  background: #dd524d;
}
</style>
