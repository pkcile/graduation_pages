<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-10-16 00:56:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /江西师大学生位置签到管理系统/graduation-project/page-view/src/components/main/main.vue
-->

<template>
  <div class="home-main">
    <!-- 表单 -->
    <ul class="mine-form-display" style="">
      <!-- <li>
        <span>坐标定位</span>
        <span>
          {{ parseFloat(formData.get.locationItem.geometry.coordinates[0]).toFixed(2) }},
          {{ parseFloat(formData.get.locationItem.geometry.coordinates[1]).toFixed(2) }}
        </span
        >
      </li> -->
      <li>
        <span>开始时间</span>
        <span>{{ formData.login.task_starttime }}</span>
      </li>
      <li>
        <span>结束时间</span>
        <span>{{ formData.login.task_endtime }}</span>
      </li>
      <li>
        <span>打卡地点</span>
        <span>{{ formData.login.task_placename }}</span>
      </li>
      <li style="background: #efeff3"><span>备注</span></li>
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="请详细描述你的问题和意见..."
        v-model="formData.get.comment"
      ></textarea>
    </ul>
    <!-- 按钮 -->
    <!-- <div class="mine-button-white-whole" v-on:click="changeSendPartControl001"> 查看 </div> -->
    <div class="mine-button-block bottom-fix" v-on:click="getCurrentLocation">
      获取定位
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

import login from "@/api/login/login.js";
import "@/assets/style/common/mobile-form.scss"

export default {
  name: "test001",
  data() {
    return {
      formData: {
        // 1.登陆获取信息
        login: {
          role: "guest",
          name: "guest",
          username: "guest",
          task_radius: "未获取",
          task_starttime: "未获取",
          task_endtime: "未获取",
          task_placename: "未获取",
          task_id: "40",
        },
        // 2.用户提交信息
        get: {
          locationItem: {
            type: "Feature",
            properties: {
              title: "浏览器定位信息",
              collect_time: "2021-06-02 15:47",
              place_name: null,
              location_accuracy: null,
              location_timestamp: null,
              location_status: null,
            },
            geometry: {
              type: "Point",
              coordinates: [116.317967, 35.116952],
            },
          },
          comment: "",
          sendDatabase: {
            user_username: null,
            task_id: null,
            comment: null,
            datenow: "2021-10-15 10:12"
          }
        },
        // 3.控件控制信息
        control: {},
      },
      sendPart: {
        control: true,
      },
      getCurrentLocationData: {
        control: false,
        nth: 0,
        max: 3,
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

    // 信息初始化
    this.$store.dispatch("login", {
      login,
      params: { username: "pkcile", password: "1234" },
    });
  },
  methods: {
    // 弹窗显示控制
    changeSendPartControl() {
      this.sendPart.control = !this.sendPart.control;
    },
    // 获取位置、分析位置
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
      const map = this.esriMap.map;

      // 状态判断
      if (control == false || (control == true && nth <= max)) {
        getCurrentLocationJudge = 1;
      }
      
      if (getCurrentLocationJudge) {
        _this.getCurrentLocationData.control = true;
        _this.getCurrentLocationData.nth++;
        // console.log(GeolocationShow);
        // 1.获取定位信息
        new GeolocationShow(view).then(function (data) {
          _this.getCurrentLocationData.locationItem = data;
          const locationCoords =
            _this.getCurrentLocationData?.locationItem?.geometry?.coordinates;
          const queryParamConfig = {
            bufferDistance: "500",
            whereParamField: "Name",
            whereParamValue: "'惟义楼'",
          };

          if (locationCoords) {
            _this.$toast({
              message: "位置获取成功",
              position: "bottom",                                                                                                                                                                                                                                                                                                                     
              a
            });
            // 2.分析结果、发送数据
            new AnalysePosition(map, view, locationCoords, queryParamConfig)
              .then(function(analysePositionResult) {
                // 3.进入结果页面
                _this.sendPart.control = !_this.sendPart.control;
                return analysePositionResult;
              })
              .then(function(data) {
                console.log(data);
              })

            
            // 4.分析签到结果：根据时间戳、位置分析结果
          }
        });
      } 
      else {
        console.log("请稍后再试试");
      }
    },
    // 分析结果、发送数据
    analyseAndSend() {
      const view = this.esriMap.view;
      const map = this.esriMap.map;
      const locationCoords =
        this.getCurrentLocationData?.locationItem?.geometry?.coordinates;
      const queryParamConfig = {
        bufferDistance: "500",
        whereParamField: "Name",
        whereParamValue: "'惟义楼'",
      };

      if (1) {
        new AnalysePosition(map, view, locationCoords, queryParamConfig);
        // AnalysePosition(map, view, locationCoords, queryParamConfig)();
      }
    },
  },
  components: {},
  computed: {
    // 控制经纬度的小数点位数
  },
};
</script>

<style lang="scss" scoped>
.home-main {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  // position: ;
  .bottom-fix {
    position: sticky;
    bottom: 20px;
    left: 0;
  }
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


</style>
