<!--
 * @Author: your name
 * @Date: 2021-11-09 22:22:58
 * @LastEditTime: 2021-11-09 23:15:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/user/signIn/stepSignGet.vue
-->

<template>
  <div style="background-color: #fff; width: 100%; height: 100%">
    <section class="date">2021年11月09日</section>
    <section class="infor-title">
      <div>江西师范大学</div>
      <div>地点微调</div>
    </section>
    <section id="sign-map"></section>
    <div class="sigin-get">
      <section class="sign-button">
        <div>签到</div>
        <div>23:06</div>
      </section>
      <section class="sign-reminder">
        今天你已经签到6次
      </section>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.date {
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid #aaa;
}
.infor-title {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 10px;
  & > div:nth-of-type(1) {
    font-size: 22px;
    flex: 1 0 200px;
  }
  & > div:nth-of-type(2) {
    font-size: 18px;
    color: #00f;
    flex: 0 0 100px;
    display: flex;
    justify-content: right;
  }
}

#sign-map {
  width: 100%;
  height: 200px;
  background: #bfa;
}

.sign-button {
  display: block;
  width: 140px;
  height: 140px;
  border-radius: 75px;
  background: #fba;
  margin: 0 auto;
}


</style>