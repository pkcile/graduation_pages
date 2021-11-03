/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-11-01 22:18:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Tabbar, Toast, ContactCard, Form, Field,  } from 'vant';
import { Toast, Notify } from 'vant'

import "@/assets/style/common/mobile-form.scss";
import "@/assets/style/common/mobile-whole-layout.scss";
import "@/assets/style/reset/reset.css";

Vue.use(Toast);
Vue.use(Notify);

Vue.config.productionTip = true
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
