/*
 * @Author: your name
 * @Date: 2021-09-24 20:36:47
 * @LastEditTime: 2022-03-29 11:53:59
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Tabbar, Toast, ContactCard, Form, Field,  } from 'vant';
import { Toast, Notify } from 'vant'
// import VueCompositionAPI from '@vue/composition-api'

import "@/assets/style/common/mobile-form.scss";
import "@/assets/style/common/mobile-whole-layout.scss";
import "@/assets/style/reset/reset.css";

import "@/utils/keyboard.js"

import * as uni from './utils/webview.js'  

document.addEventListener("UniAppJSBridgeReady", function() {  
    Vue.prototype.myUni = uni;
    console.log(uni);
});

// console.log(this.myUni);


Vue.use(Toast);
Vue.use(Notify);
// Vue.use(VueCompositionAPI)

Vue.config.productionTip = true
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
