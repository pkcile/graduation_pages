<!--
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-25 15:27:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\views\Home.vue
-->
<template>
    <div class="home">
        <!-- 头部 -->
        <header id="header" style="box-sizing: border-box; text-align: center;line-height: 50px;background: #F7F7F7;font-weight: 500;font-size: 17px;">
          默认标题 
        </header>
        <!-- 内容区域 -->
        <main class="main">
          <router-view />
        </main>
        <!-- 导航 -->
        <van-tabbar v-model="active" class="footer">
            <van-tabbar-item badge="3" to="/home/main">
                <span>签到</span>
                <template #icon="props">
                <img :src="props.active ? icon.active : icon.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search" to="/home/social">动态</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/home/mine">我的</van-tabbar-item>
            <!-- 
              '/' : 根路由
            -->
        </van-tabbar>
    </div>
</template>

<script>
import axios from 'axios';
console.log(process.env.VUE_APP_POSITION_PATH);
export default {
    data() {
        return {
          active: 0,
          icon: {
            active: 'https://img01.yzcdn.cn/vant/user-active.png',
            inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
          },
        };
    },
    mounted() {
      console.log(process.env);
      // axios.get(`${process.env.VUE_APP_POSITION_PATH}/api/position/login`).then((data) => {
      //   console.log(data);
      // })
    }
    
}
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