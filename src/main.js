/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-19 20:15:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tabbar, TabbarItem, Toast } from 'vant';

import "@/assets/style/common/mobile-form.scss";
import "@/assets/style/common/mobile-whole-layout.scss";
import "@/assets/style/reset/reset.css";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
