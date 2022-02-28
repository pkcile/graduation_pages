<!--
 * @Author: your name
 * @Date: 2021-11-12 15:14:30
 * @LastEditTime: 2021-11-12 15:15:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/components/user/path/Get.vue
-->


<template>
  <div class="mine-send-part-absolute" style="width:100%;height:100%;">
    <div class="send-title">
      运动轨迹记录
      <router-link to="/home/more">
        <div
          class="send-control"
          :style="{
            'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
          }"
        ></div>
      </router-link>
    </div>
    <ul class="send-main">
      <section class="date">{{ date.full }}</section>
      <section class="infor-title">
        <div>江西师范大学</div>
        <div>地点微调</div>
      </section>
      <section id="sign-map"></section>
      <div class="sign-get">
        <section class="sign-button">
          <div>签到</div>
          <div>{{ date.hourMinute }}</div>
        </section>
        <section class="sign-reminder">今天你已经签到6次</section>
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
      new initLeaflet("sign-map", defaultConfig);

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
.date {
  line-height: 40px;
  font-size: 15px;
  border-bottom: 1px solid #aaa;
  padding: 10px;
  background: #fff;
}

.infor-title {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 10px;
  font-size: 17px;
  color: #555;
  background: #fff;
  & > div:nth-of-type(1) {
    // font-size: 22px;
    flex: 1 0 200px;
  }
  & > div:nth-of-type(2) {
    color: rgba(0, 0, 255, 0.692);
    flex: 0 0 100px;
    display: flex;
    justify-content: right;
  }
}

#sign-map {
  width: 100%;
  height: 200px;
  // background: #bfa;
}

.sign-get {
  padding: 30px 0 0 0;
  @keyframes round001
  {
      0%   {background: #fca;}
      75%  {background: #fba;}
      100% {background: #faa;}
  }
  .sign-button {
    display: block;
    width: 140px;
    height: 140px;
    border-radius: 75px;
    background: #fba;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    animation-name: round001;
    animation-duration: 1.75s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;


    div {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > div:nth-of-type(1) {
      align-items: flex-end;
    }
    & > div:nth-of-type(2) {
      align-items: flex-start;
    }
  }

  .sign-reminder {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* leaflet图片样式设置 */
  img.leaflet-marker-icon {
    border-radius: 10px !important;
  }
}
</style>