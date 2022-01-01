<!--
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2022-01-01 19:22:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\views\Home.vue
-->
<template>
  <div class="home">
    <!-- 头部 -->
    <header
      id="header"
      style="
        box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        background: #f7f7f7;
        font-weight: 400;
        font-size: 17px;
      "
    >
      校园打卡系统
    </header>
    <!-- 内容区域 -->
    <main class="main">
      <router-view />
    </main>
    <!-- 导航 -->
    <van-tabbar v-model="active" class="footer">
      <van-tabbar-item to="/home/main">
        <span>打卡</span>
        <template #icon="props">
          <img :src="props.active ? iconMain.active : iconMain.inactive" style="height: 23px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/social">
        <span>更多</span>
        <template #icon="props">
          <img :src="props.active ? iconSocial.active : iconSocial.inactive" style="height: 23px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/work">
        <span>工作</span>
        <template #icon="props">
          <img :src="props.active ? iconWork.active : iconWork.inactive" style="height: 23px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/mine">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? iconMine.active : iconMine.inactive" style="height: 23px;"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant"
import axios from "axios"
export default {
  data() {
    return {
      active: 0,
      iconMain: {
        active: require("@/assets/img/home/clock.svg"),
        inactive: require("@/assets/img/home/clock-grey.svg"),
      },
      iconSocial: {
        active: require("@/assets/img/home/more.svg"),
        inactive: require("@/assets/img/home/more-grey.svg"),
      },
      iconMine: {
        active: require("@/assets/img/home/mine.svg"),
        inactive: require("@/assets/img/home/mine-grey.svg"),
      },
      iconWork: {
        active: require("@/assets/img/home/clock.svg"),
        inactive: require("@/assets/img/home/clock-grey.svg")
      }
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  mounted() {
    this.$store.commit("User/updataLloginIn");
  }
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;

  .header {
    height: 50px;
    width: 100%;
  }

  .main {
    height: calc(100% - 120px);
    width: 100%;
  }

  .footer {
    height: 70px;
    width: 100%;
  }
}

.van-tabbar-item:active {
  background: #eee;
  transition: all 100ms;
}
</style>