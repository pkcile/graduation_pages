<!--
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-31 16:46:45
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
        font-weight: 500;
        font-size: 17px;
      "
    >
      默认标题
    </header>
    <!-- 内容区域 -->
    <main class="main">
      <router-view />
    </main>
    <!-- 导航 -->
    <van-tabbar v-model="active" class="footer">
      <van-tabbar-item badge="3" to="/home/main">
        <span>打卡</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/social">更多</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/home/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant"
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
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
</style>