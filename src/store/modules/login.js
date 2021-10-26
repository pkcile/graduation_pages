/*
 * @Author: your name
 * @Date: 2021-10-14 22:54:00
 * @LastEditTime: 2021-10-26 18:55:09
 * @LastEditors: Please set LastEditors
 * @Description: 用户登陆信息
 * @FilePath: /graduation-project-master/src/store/modules/login.js
 */
import * as turf from "@turf/turf";
import axios from "axios";

const state = {
  // 1.登陆获取信息
  login: {
    role: "学生",
    name: "王朋坤",
    username: "pkcile",
    task_radius: "100",
    task_starttime: "2021-07-09 11:19:00",
    task_endtime: "2021-11-14 11:19:00",
    task_placename: "1#",
    task_id: "40",
    positionData: false,
  },
  // 2.用户提交信息
  get: {
    locationItem: {
      positionPoint: {
        latitude: 28.68687471077349,
        longitude: 116.02624654769897,
      },
    },
    sendDatabase: {
      task_id: 20,
      comment: "",
      datenow: "2021-10-15 10:12",
      username: "pkcile",
      task_status: 2,
    },
  },
};

const getters = {
  positionPointGeoJSON: (state) => {
    return () => {
      return turf.point([
        state?.get?.locationItem?.positionPoint?.longitude,
        state?.get?.locationItem?.positionPoint?.latitude,
      ]);
    };
  },
};

const mutations = {
  // 登陆配置
  loginIn(state, param) {
    const loginPerson = param.loginPerson;
    console.log(loginPerson);
    state.login.role = loginPerson.role;
    state.login.name = loginPerson.name;
    state.login.username = loginPerson.username;
    state.login.task_radius = loginPerson.task_radius;
    state.login.task_starttime = loginPerson.task_starttime;
    state.login.task_endtime = loginPerson.task_endtime;
    state.login.task_placename = loginPerson.task_placename;
    state.login.task_id = loginPerson.task_id;
    state.login.positionData = loginPerson.positionData;
  },
};

const actions = {
  // 登录获取保存数据
  loginIn(context, userInfo) {
    console.log(context);
    const { Toast, Router, login } = {
      Toast: userInfo.Toast,
      Router: userInfo.Router,
      login: userInfo.login,
    };
    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/login`, {
        params: login,
      })
      .then((returnData) => {
        const loginData = returnData.data;
        if (loginData?.login[0]?.status != "false") {
          Toast("登陆成功");
          // 录入数据
          context.commit("loginIn", {loginPerson: loginData.login[0]});
          context.dispatch("loginStorage");
          window.sessionStorage.setItem("loginData", JSON.stringify(loginData.login[0]));
          // Router.push("/home/mine");
        } else {
          Toast("登陆失败");
        }
      });
  },
  // 登陆数据持久化
  loginStorage(context, params) {
    axios.get("./school-building.geojson").then(function(initPosition) {
      window.localStorage.removeItem("initPositionData");
      window.localStorage.setItem(
        "initPositionData",
        JSON.stringify(initPosition?.data)
      );
    });
  },
  // 登出清除数据
  loginOut(context) {
    sessionStorage.clear();
    context.commit("setToken", "");
    context.commit("setRefreshToken", "");
    context.commit("setUserInfo", {});
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
