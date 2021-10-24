<!--
 * @Author: your name
 * @Date: 2021-10-24 23:00:44
 * @LastEditTime: 2021-10-24 23:33:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/views/User.vue
-->

<template>
    <div class="home">
        <!-- 头部 -->
      <van-nav-bar
        class="header"
        title="标题"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
        <!-- 内容区域 -->
        <main class="main">
          <router-view />
        </main>
        <!-- 导航 -->
        <footer class="footer">
        </footer>
    </div>
</template>

<script>
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
    }
    
}
</script>

<style scoped lang="scss">

.home {
  width: 100%;
  height: 100%;

  .header {
    height: 56px;
    width: 100%;
  }

  .main {
    height: calc(100% - 126px);
    width: 100%;
  }

  .footer {
    height: 70px;
    width: 100%;
  }
}

</style>