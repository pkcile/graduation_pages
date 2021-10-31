/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-31 16:49:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Tabbar, TabbarItem, Toast, ContactCard, Form, Field,  } from 'vant';
import { Toast } from 'vant'

import "@/assets/style/common/mobile-form.scss";
import "@/assets/style/common/mobile-whole-layout.scss";
import "@/assets/style/reset/reset.css";

Vue.use(Toast);

Vue.config.productionTip = true
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
