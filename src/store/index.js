/*
 * @Author: your name
 * @Date: 2021-10-14 21:50:35
 * @LastEditTime: 2021-10-27 10:53:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/store/index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import User from './modules/User';
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
      
  },
  actions: {
    login(context, parts) {
      // 异步获取数据
      parts.login(parts.params).then(rs => {
        console.log(rs.data);


      });
      // 写入login状态
    }

  },
  modules: {
    User
  }
})
