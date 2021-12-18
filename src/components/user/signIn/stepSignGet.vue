<!--
 * @Author: your name
 * @Date: 2021-11-09 22:22:58
 * @LastEditTime: 2021-11-26 14:53:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/stepSignGet.vue
-->

<template>
  <div class="mine-send-part-absolute-sign" style="width:100%;height:100%;background:#fff;">
    <div class="send-title">
      打卡信息设置
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
      <section class="date">{{ date.full }}</section>
      <section class="infor-title">
        <div>江西师范大学</div>
        <div>地点微调</div>
      </section>
      <section id="sign-map"></section>
      <div class="sign-get">
        <section class="sign-button" @click="getInfor">
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
      },
      geolocationData: null,
      poiname: null
    };
  },
  mounted() {
    const _this = this;
    this.setTimeFun();
    new Promise(getCurrentLocation)
      .then(function(geolocationData) {
        console.log(geolocationData);
        _this.geolocationData = geolocationData;
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
      const map = new initLeaflet("sign-map", defaultConfig);
      this.map = map;

    },
    setTimeFun() {
      setInterval(() => {
        this.date.full = convertDate();
        this.date.hourMinute = convertDate().substr(11, 5);
      }, 500);
    },
    getInfor() {
      // 修改父组件中的属性值
      this.$emit("open-send-form", {geolocationData: this.geolocationData, poiname: this.poiname});
    }
  },
  watch: {

  }
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
  height: 230px;
}

.sign-get {
  padding: 30px 0 0 0;
  @keyframes round001
  {
      0%   {background: rgb(231, 156, 106);}
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