<!--
 * @Author: your name
 * @Date: 2021-10-13 10:51:39
 * @LastEditTime: 2021-10-13 18:31:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/mine/mine.vue
-->

<template>
  <div class="home-mine">
    <!-- 用户信息设置 -->
    <div class="mine-form-user-information">
      <img src="@/assets/img/user/1.jpg" alt="" />
      <div class="user-main">
        <div>pkcile</div>
        <div>201824803050</div>
      </div>
      <div class="user-jump"></div>
    </div>
    <!-- 用户信息查看 -->
    <ul class="mine-form-display-infor" style="">
      <li>
        <span>个人说明</span>
        <span>武功再高，也怕菜刀</span>
        <!-- <span>11</span> -->
      </li>
      <li>
        <span>上次登陆</span>
        <span>2021-10-13 17:56</span>
      </li>
      <li>
        <span>打卡日志</span>
        <span></span>
      </li>
    </ul>
    <!-- 用户功能设置 -->
    <div class="mine-button-block mine-button-white">退出登录</div>
  </div>
</template>

<script>
import "@/assets/style/common/mobile-form.scss"
export default {
  
}
</script>

<style lang="scss" scoped>
.home-mine {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

// 表单样式
.mine-form-display-infor {
  background: #fff;
  margin: 10px 5px;
  li {
    display: flex;
    padding: 0px 15px;
    height: 50px;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #efeff3;
    & > span {
      display: flex;
      // justify-content: flex-start;
      align-items: center;
      height: 100%;
    }
    & > span:nth-child(1) {
      flex: 0 0 100px;
      // background: #bfa;
    }
    & > span:nth-child(2) {
      flex: 2 1 200px;
    }
    & > textarea {
      border-width: 0;
      width: 100%;
      padding: 10px;
    }
  }

}

// 按钮组件
.mine-button-style {
  display: inline-block;
  line-height: 40px;
  padding: 8px;
  background: #017aff;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  width: 100px;
  margin: 5px auto;
}

.mine-button-block {
  display: block;
  line-height: 40px;
  padding: 7px;
  background: #017aff;
  color: white;
  text-align: center;
  border-radius: 5px;
  width: calc(100% - 25px);
  margin: 8px auto;
}

.mine-button-red {
  background: #dd524d;
}

.mine-button-white {
  background: #fff;
  color: #007AFF;
  font-weight: 400;
  border-radius: 0;
  font-size: 18px;
}
</style>