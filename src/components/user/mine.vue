<!--
 * @Author: your name
 * @Date: 2021-10-13 10:51:39
 * @LastEditTime: 2022-03-26 22:16:04
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/mine.vue
-->

<template>
  <div class="home-mine">
    <!-- 用户信息设置 -->
    <div class="mine-form-user-information">
      <img src="@/assets/img/user/1.jpg" alt="" />
      <div class="user-main">
        <div>{{ "王朋坤" }}</div>
        <div>{{ "2018248*****" }}</div>
      </div>
      <div class="user-jump"  :style="{'background-image': `url(${require('@/assets/font/arrow.svg')})`}"></div>
    </div>
    <!-- 用户信息查看 -->
    <ul class="mine-form-display-infor" style="">
      <li>
        <span>{{ "个人说明"}}</span>
        <span>{{ "武功再高，也怕菜刀" }}</span>
      </li>
      <li>  
        <span>上次登陆</span>
        <span>{{ "2021-10-13 17:56" }}</span>
      </li>
      <li>
        <span>打卡日志</span>
        <span></span>
      </li>
    </ul>
    <!-- 用户功能设置 -->
    <div class="mine-button-block mine-button-white" @click="loginOut">退出登录</div>
  </div>
</template>

<script>
import "@/assets/style/common/mobile-form.scss"
import { Dialog } from 'vant';
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component.name,
  },
  methods: {
    loginOut() {
    this.$dialog.confirm({
      title: '是否退出登陆'
       
    })
      .then(() => {
        // on confirm
        this.$router.push("/user/login");
        window.sessionStorage.clear("loginData");
        this.$notify({ type: "primary", message: "注销登陆成功"});
      })
      .catch(() => {
        // on cancel
        this.$toast("取消成功");
      });

    },
    // components: {
    //   [Dialog.name]: Dialog
    // }

  },
  mounted() {
    // this.$notify({type: "primary", message: "欢迎来到个人中心"});
  }
}
</script>

<style lang="scss" scoped>
.home-mine {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.van-dialog .van-dialog--default {
  border-radius: 8px !important;
  // border-radius: 16px;
}

</style>