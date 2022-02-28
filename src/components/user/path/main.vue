<!--
 * @Author: your name
 * @Date: 2021-11-12 15:13:52
 * @LastEditTime: 2021-11-13 10:18:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/src/components/user/path/main.vue
-->

<template>
  <div class="mine-send-part-absolute" style="width:100%;height:100%;background: #fff;">
    <div class="send-title">
      运动路径记录显示
      <router-link to="/home/more">
        <div
          class="send-control"
          :style="{
            'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
          }"
        ></div>
      </router-link>
    </div>
    <ul class="send-main" style="height: calc(100% - 50px)">
      <section class="date">
        实时时间：{{ date.full }}
        <br>
        运动时间：1s
        </section>
      <section id="sign-map" 
        :style="{
          'background': `#fff`,
        }"
      ></section>
      <div class="sign-get">
        <section class="sign-reminder">
          <div>运动状态：未开始</div>
          <div>提示信息：这是一条提示信息</div>
        </section>
        <section class="sign-button">
          <div>开始</div>
        </section>
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
  // border-bottom: 1px solid #aaa;
  padding: 10px;
  background: #fff;
  // margin-bottom: 15px;
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
  height: 300px;
  // background: #bfa;
    animation-name: round001;
    animation-duration: 1;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
}

@keyframes round001
{
    0%   {background: rgba(0, 89, 255, 0.856);}
    75%  {background: rgba(0, 0, 255, 0.561);}
    100% {background: #00f;}
}

.sign-get {
  margin: 10px;
  display: flex;
  height: 110px;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 5px;
  // background: 

  .sign-button {
    flex: 0 0 100px;
    height: 100px;
    color: #fff;
    display: block;
    border-radius: 50px;
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
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > div:nth-of-type(1) {
      align-items: center;
    }
  }

  .sign-reminder {
    flex: 1 0 200px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: center;
    padding: 0 0 0 10px;
    height: 100%;
    // border-right: 1px solid #0000ea;
    div {
      line-height: 30px;
      height: 50%;
      display: flex;
      align-items: center;
    }
    // & > div:nth-of-type(1) {
    //   height: 50%;
    // }
  }
}
</style>