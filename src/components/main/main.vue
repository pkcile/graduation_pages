<!--
 * @Author: your name
 * @Date: 2021-09-27 16:30:08
 * @LastEditTime: 2021-10-18 18:07:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /江西师大学生位置签到管理系统/graduation-project/page-view/src/components/main/main.vue
-->

<template>
  <div class="home-main">
    <!-- 表单 -->
    <ul class="mine-form-display" style="">
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
import "@/assets/style/common/mobile-form.scss";

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
            datenow: "2021-10-15 10:12",
          },
        },
        // 3.控件控制信息
        control: {},
      },
      sendPart: {
        control: false,
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
    // // 信息初始化
    // this.$store.dispatch("login", {
    //   login,
    //   params: { username: "pkcile", password: "1234" },
    // });

    const map = L.map("viewDiv").setView([28.682975759198253, 116.026260653], 16);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution: "Mapbox",
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);
    
  },
  methods: {
    // 弹窗显示控制
    changeSendPartControl() {
      this.sendPart.control = !this.sendPart.control;
    },
    // 获取位置、分析位置
    getCurrentLocation() {
      console.log(this.sendPart.control);
      // 控件显示配置
      let { _this, control, nth, max, getCurrentLocationJudge } = {
        _this: this,
        control: this.getCurrentLocationData.control,
        nth: this.getCurrentLocationData.nth,
        max: this.getCurrentLocationData.max,
        getCurrentLocationJudge: 0,
      };
      if (control == false || (control == true && nth <= max)) {
        getCurrentLocationJudge = 1;
      }
      if (getCurrentLocationJudge) {
        _this.getCurrentLocationData.control = true;
        _this.getCurrentLocationData.nth++;
        _this.sendPart.control = false;
      } else {
        console.log("请稍后再试试");
      }
    },
    // 发送信息
    analyseAndSend() {},
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
