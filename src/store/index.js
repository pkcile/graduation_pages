/*
 * @Author: your name
 * @Date: 2021-10-14 21:50:35
 * @LastEditTime: 2021-10-14 21:51:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/store/index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user';
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
