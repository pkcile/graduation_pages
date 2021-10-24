/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2021-10-24 23:26:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tabbar, TabbarItem, Toast, ContactCard, Form, Field, NavBar } from 'vant';

import "@/assets/style/common/mobile-form.scss";
import "@/assets/style/common/mobile-whole-layout.scss";
import "@/assets/style/reset/reset.css";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(ContactCard);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
