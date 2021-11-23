<!--
 * @Author: your name
 * @Date: 2021-11-09 22:25:05
 * @LastEditTime: 2021-11-22 15:18:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/stepSignResult.vue
-->

<template>
  <div class="mine-send-part-absolute-sign" style="width:100%;height:100%;background:#fff;">
    <div class="send-title">
      签到详情
      <router-link to="/home/social">
        <div
          class="send-control"
          :style="{
            'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
          }"
        ></div>
      </router-link>
    </div>
    <ul class="send-main">
      <section id="sign-map02"></section>
      <div class="sign-result">
        <!-- 日期标题 -->
        <!-- <div class="date-title">11月14日</div> -->
        <!-- 单个信息卡片 -->
        <div class="sign-person-card">
          <div class="title">
            <div>
              21:12
            </div>
            <div>
              1栋
            </div>

          </div>
          <div class="main">
            <div>
              <div>签到备注</div>
              <div>一个签到备注zzz</div>
            </div>
            <div>
              <div>签到坐标</div>
              <div>坐标何许人也</div>
            </div>   
            <!-- <div>
              <div>设备信息</div>
              <div>一个设备信息</div>
            </div>   -->
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { convertDate } from "@/utils/date.js"
import { getCurrentLocation } from "@/utils/geolocation.js"
import initLeaflet from "@/map/leaflet/init.js"

export default {
  data() {
    return {
      map: "",
      number: convertDate(),
      date: {
        full: convertDate(),
        hourMinute: convertDate().substr(11, 5)
      }
    };
  },
  mounted() {
    const _this = this;
    this.setTimeFun();
    new Promise(getCurrentLocation)
      .then(function(geolocationData) {
        _this.initMap(geolocationData);
      })
    
  },
  computed: {
    setTimeFun01: function() {
      setInterval(() => {
        this.date.full = convertDate();
        this.date.hourMinute = convertDate().substr(11, 5);
      }, 500);
    }
  },
  methods: {
    initMap(position) {
      // 初始化leaflet地图
      let defaultConfig = {
        position
      };
      new initLeaflet("sign-map02", defaultConfig);

    },
    setTimeFun() {
      setInterval(() => {
        this.date.full = convertDate();
        this.date.hourMinute = convertDate().substr(11, 5);
      }, 500);
    }
  },
};
</script>

<style lang="scss" scoped>

#sign-map02 {
  width: 100%;
  height: calc(100% - 185px);
}

.sign-result {
  width: 100%;
  height: 185px;
  overflow: hidden;
}
.sign-person-card {
  box-sizing: border-box;
  width: calc(100% - 10px);
  margin: 0 auto;
  height: 180px;
  border-radius: 5px;
  border: 1px solid #aaa;
  padding: 10px;
  overflow-y: auto;
  .title {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #aaa;
    & > div {
      font-size: 16px;
      // font-weight: 500;
    }
    & > div:nth-of-type(1) {
      flex: 0 0 60px;
    }
    & > div:nth-of-type(2) {
      flex: 1 0 100px;
    }
  }
  .main {
    & > div {
      margin-top: 10px;
      & > div {
        font-size: 15px;
      }
      & > div:nth-of-type(1) {
        color: #999;
      }
      & > div:nth-of-type(2) {
        line-height: 30px;
      }
    }
    

  }
}

/* 弹出组件样式2 */
.mine-send-part-absolute-sign {
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
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .send-control:active {
     background-color: #eee;
    }
  }
  .send-main {
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
  }
  
}

</style>