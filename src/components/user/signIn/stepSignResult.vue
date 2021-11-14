<!--
 * @Author: your name
 * @Date: 2021-11-09 22:25:05
 * @LastEditTime: 2021-11-14 21:27:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/stepSignResult.vue
-->

<template>
  <div class="mine-send-part-absolute" style="width:100%;height:100%;">
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
    <ul class="send-main" style="height: calc(100% - 50px)">
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
              <div>……一个签到备注</div>
            </div>
            <div>
              <div>签到坐标</div>
              <div></div>
            </div>   
            <div>
              <div>设备信息</div>
              <div></div>
            </div>  
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
  height: 70%;
  background: #bfa;
}

.sign-person-card {
  // width: calc(100% - 10px);
  margin: 10px 10px;
  height: 160px;
  border-radius: 5px;
  border: 1px solid #aaa;
  padding: 10px;
  .title {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: flex-start;
    & > div:nth-of-type(1) {
      flex: 0 0 70px;
    }
    & > div:nth-of-type(2) {
      flex: 1 0 100px;
    }
  }
  .main {

  }
}

</style>