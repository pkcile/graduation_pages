<!--
 * @Author: your name
 * @Date: 2021-10-24 22:44:46
 * @LastEditTime: 2021-10-25 10:23:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/components/login/login.vue
-->


<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        show-error="false"
        show-error-message="false"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <!-- <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div> -->
      <div class="mine-button-white-whole">登陆</div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 15px 2px;
  box-sizing: border-box;
}

.mine-button-block {
  margin: 15px auto;
  padding: 5px;
}

.mine-button-white-whole {
  margin: 12px 0;
  background: #017aff;
  color: #fff;
}

.van-cell {
  padding: 16px 26px;
}
</style>

