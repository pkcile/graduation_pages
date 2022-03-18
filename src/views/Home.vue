<!--
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2022-03-18 08:56:32
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/views/Home.vue
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
    <van-tabbar v-model="active" class="footer" active-color="#017AFF" inactive-color="#000">
      <router-link :to="item.path" v-for="item in menuData" v-bind:key="item.key" class="van-tabbar-item">
        <van-tabbar-item v-if="!item.iconsystem">
          <span>{{ item.name }}</span>
          <template #icon="props">
            <img :src="props.active ? item.active : item.inactive" style="height: 23px;"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" v-else >{{ item.name }}</van-tabbar-item>
      </router-link>
      <!-- <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant"
export default {
  data() {
    return {
      active: 2,
      menuData: [
        {
          name: "打卡",
          key: 0,
          active: require("@/assets/img/home/clock.svg"),
          inactive: require("@/assets/img/home/clock-grey.svg"),
          path: "/home/main"
        },
        {
          name: "更多",
          key: 2,
          active: require("@/assets/img/home/more.svg"),
          inactive: require("@/assets/img/home/more-grey.svg"),
          path: "/home/more"
        },
        {
          name: "我的",
          key: 3,
          active: require("@/assets/img/home/mine.svg"),
          inactive: require("@/assets/img/home/mine.svg"),
          path: "/home/mine",
          iconsystem: true,
          icon: "setting-o"
        },
      ]
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  mounted() {
    // this.$store.commit("User/updataLloginIn");
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