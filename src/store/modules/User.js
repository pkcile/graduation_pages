/*
 * @Author: your name
 * @Date: 2021-10-14 22:54:00
 * @LastEditTime: 2022-03-24 10:49:32
 * @LastEditors: 王朋坤
 * @Description: 用户登陆信息
 * @FilePath: /graduation-project-master/src/store/modules/User.js
 */
import * as turf from "@turf/turf";
import axios from "axios";
import { Notify } from 'vant';

const state = {
  // 登陆数据
  login: {
    userinformation: null,
    tasks: null,
    getGeometry: null,
    getGeometryInformation: null,
    getWifis: null
  },

  // 任务签到打卡数据
  taskSign: {
    judgeArray: [],
    signResult: []
  }

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
  loginInStore(state, param) {
    console.log(param);
    // const loginPerson = param.loginPerson;
    // state.login.role = loginPerson.role;
    // state.login.name = loginPerson.name;
    // state.login.username = loginPerson.username;
    // state.login.task_radius = loginPerson.task_radius;
    // state.login.task_starttime = loginPerson.task_starttime;
    // state.login.task_endtime = loginPerson.task_endtime;
    // state.login.task_placename = loginPerson.task_placename;
    // state.login.task_id = loginPerson.task_id;
    // state.login.positionData = loginPerson.positionData;

    // state.get.sendDatabase.task_id = loginPerson.task_id;
    // state.get.sendDatabase.comment = loginPerson.comment || "";
    // state.get.sendDatabase.datenow = loginPerson.datenow;
    // state.get.sendDatabase.username = loginPerson.username;
    // state.get.sendDatabase.task_status = loginPerson.task_status;
  },
  updataLoginIn() {
    this.commit("User/loginIn", {
      // loginPerson: JSON.parse(window.sessionStorage.getItem("loginData")),
    });
    console.log("登录");
  },
  // 登陆选项
  loginStore(state, param) {
    this.state.User.login.userinformation = param.userinformation;
    this.state.User.login.tasks = param.tasks;
    this.state.User.login.getGeometry = param.getGeometry;
    this.state.User.login.getGeometryInformation = param.getGeometryInformation;
    this.state.User.login.getWifis = param.getWifis;
  },
  // 
  taskSignStore(state, param) {
    this.state.User.taskSign.judgeArray = param.judgeArray;
    this.state.User.taskSign.signResult = param.signResult;
  }
};

const actions = {
  // 登录获取保存数据
  loginIn(context, userInfo) {
    const { Toast, Router, login } = {
      Toast: userInfo.Toast,
      Router: userInfo.Router,
      login: userInfo.login
    };

    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position`, {
        // params: login,
        // timeout: 4000,
      })
      .then((returnData) => {
       console.log(returnData);
      })
      .catch(function(error) {
        

      });
  },
  // 登陆数据持久化
  loginStorage(context, params) {
    axios.get("./school-building.geojson").then(function(initPosition) {
      window.localStorage.removeItem("initPositionData");
      window.localStorage.setItem("initPositionData", JSON.stringify(initPosition.data));
    });
  },
  // 登出清除数据
  loginOut(context) {
    sessionStorage.clear();
    this.loginStor;
    context.commit("setToken", "");
    context.commit("setRefreshToken", "");
    context.commit("setUserInfo", {});
  },
  // 注册
  registerAccount(context, userInfo) {
    let { Toast, Router, register } = {
      Toast: userInfo.Toast,
      Router: userInfo.Router,
      register: userInfo.register,
    };
    // http://127.0.0.1:8000/api/position/register?user_username=edqd&user_nth=201824803057&user_password=1234

    register = {
      user_username: register.username,
      user_nth: register.nth,
      user_password: register.password,
    };

    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/register`, {
        params: register,
        timeout: 0,
      })
      .then(function(returnData) {
        Toast(returnData.data.result);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
