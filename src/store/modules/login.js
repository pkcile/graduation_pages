/*
 * @Author: your name
 * @Date: 2021-10-14 22:54:00
 * @LastEditTime: 2021-10-24 11:26:44
 * @LastEditors: Please set LastEditors
 * @Description: 用户登陆信息
 * @FilePath: /graduation-project-master/src/store/modules/login.js
 */
import * as turf from "@turf/turf"

const state = {
    // 1.登陆获取信息
    login: {
      "role": JSON.parse(sessionStorage.getItem('userInfo')) || "学生",
      "name": "王朋坤",
      "username": "pkcile",
      "task_radius": "1",
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
  setRefreshToken(state, refreshToken) {
      state.refresh_token = refreshToken;
  },
  setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
  },
  setXzqhTree(state, treeData) {
      state.xzqhTree = treeData;
  },
  
  //设置用户功能树
  setUserMenu(state, menuTree) {
      state.menuTree = menuTree;
  },

  setRoleList(state, list) {
      state.roleList = list;
  }
};

const actions = {
  // 登录保存touken
  setTokenAct(context, token) {
      let t = token;
      sessionStorage.setItem('token', t);
      context.commit('setToken', t);
  },
  setUserInfoAct(context, userInfo) {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      context.commit('setUserInfo', userInfo);
  },
  // 退出登录
  logoutAct(context) {
      sessionStorage.clear();
      context.commit('setToken', '');
      context.commit('setRefreshToken', '');
      context.commit('setUserInfo', {});
  },
  //用户功能树
  setUserMenuAct(context, menuTree) {
      sessionStorage.setItem('menuTree', JSON.stringify(menuTree));
      context.commit('setUserMenu', menuTree);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
