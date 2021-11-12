<!--
 * @Author: your name
 * @Date: 2021-11-09 22:22:58
 * @LastEditTime: 2021-11-11 22:38:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/stepSignGet.vue
-->

<template>
  <div class="mine-send-part-absolute" style="width:100%;height:100%;">
    <!-- background: #F7F7F7; -->
    <div class="send-title">
      打卡信息设置
      <div
        class="send-control"
        :style="{
          'background-image': `url(${require('@/assets/font/arrow-left.svg')})`,
        }"

      ></div>
              <!-- @click="backTo" -->
    </div>
    <ul class="send-main">
      <section class="date">2021年11月09日{{ number }}</section>
      <section class="infor-title">
        <div>江西师范大学</div>
        <div>地点微调</div>
      </section>
      <section id="sign-map"></section>
      <div class="sign-get">
        <section class="sign-button">
          <div>签到</div>
          <div>23:06</div>
        </section>
        <section class="sign-reminder">今天你已经签到6次</section>
      </div>
    </ul>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  data() {
    return {
      map: "",
      number: 1,
    };
  },
  mounted() {
    this.initDate();
    console.log(L);
  },
  computed: {
    fun01() {
      setInterval(() => {
        this.number++;
      }, 100);
    }
  },
  methods: {
    initDate() {
      const map = L.map("sign-map").setView(
        [28.682975759198253, 116.026260653],
        16
      );
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "Mapbox",
      }).addTo(map);

      const pointArray = [];
      L.DomEvent.on(map, "click", function (ev) {
        pointArray.push([ev.latlng.lng, ev.latlng.lat]);
        console.log(JSON.stringify(pointArray));
        // L.DomEvent.stopPropagation(ev);
      });
      console.log(L);
    },
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
  .sign-button {
    display: block;
    width: 140px;
    height: 140px;
    border-radius: 75px;
    background: #fba;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    div {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & > div:nth-of-type(1) {
      align-items: end;
    }
    & > div:nth-of-type(2) {
      align-items: start;
    }
  }

  .sign-reminder {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>