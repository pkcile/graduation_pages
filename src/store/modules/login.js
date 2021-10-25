/*
 * @Author: your name
 * @Date: 2021-10-14 22:54:00
 * @LastEditTime: 2021-10-25 18:23:30
 * @LastEditors: Please set LastEditors
 * @Description: 用户登陆信息
 * @FilePath: /graduation-project-master/src/store/modules/login.js
 */
import * as turf from "@turf/turf"

const state = {
    // 1.登陆获取信息
    login: {
      "role": "学生",
      "name": "王朋坤",
      "username": "pkcile",
      "task_radius": "100",
      "task_starttime": "2021-07-09 11:19:00",
      "task_endtime": "2021-11-14 11:19:00",
      "task_placename": "1#",
      "task_id": "40",
      "positionData": false
    },
    // 2.用户提交信息
    get: {
      locationItem: {
        positionPoint: {latitude: 28.68687471077349, longitude: 116.02624654769897}
      },
      sendDatabase: {
        task_id: 20,
        comment: "",
        datenow: "2021-10-15 10:12",
        username: "pkcile",
        task_status: 2
      },
    }
};

const getters = {
  positionPointGeoJSON: state => {
    return () => {
     return turf.point([state?.get?.locationItem?.positionPoint?.longitude, state?.get?.locationItem?.positionPoint?.latitude])
    }
  }
};

const mutations = {
  
  setToken(state, token) {
      state.token = token;
  },
  loginIn(state, param) {
    console.log(param)
    param._this.$toast("兄弟可以啊");
  }
};

const actions = {
  // 登录保存touken
  loginIn(context, userInfo) {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      context.commit('setUserInfo', userInfo);
  },
  // 退出登录
  loginOut(context) {
      sessionStorage.clear();
      context.commit('setToken', '');
      context.commit('setRefreshToken', '');
      context.commit('setUserInfo', {});
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
