/*
 * @Author: your name
 * @Date: 2021-10-14 22:54:00
 * @LastEditTime: 2021-10-27 18:10:57
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
    name: "guest",
    username: "guest",
    task_radius: null,
    task_starttime: null, //2021-11-14 11:19:00
    task_endtime: null,
    task_placename: null,
    task_id: null,
    positionData: null,
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
      task_id: null,
      comment: null,
      datenow: null,
      username: null,
      task_status: null,
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

    state.get.sendDatabase.task_id = loginPerson.task_id;
    state.get.sendDatabase.comment = loginPerson.comment || "";
    state.get.sendDatabase.datenow = loginPerson.datenow;
    state.get.sendDatabase.username = loginPerson.username;
    state.get.sendDatabase.task_status = loginPerson.task_status;

    // state.get.sendDatabase.task_id = 21;
    // state.get.sendDatabase.comment = "";
    // state.get.sendDatabase.datenow = "";
    // state.get.sendDatabase.username = "pkcile";
    // state.get.sendDatabase.task_status = "-1";

    // state ={
    //   login: {
    //     role: loginPerson.role,
    //     name: loginPerson.name,
    //     username: loginPerson.username,
    //     task_radius: loginPerson.task_radius,
    //     task_starttime: loginPerson.task_starttime,
    //     task_endtime: loginPerson.task_endtime,
    //     task_placename: loginPerson.task_placename,
    //     task_id: loginPerson.task_id,
    //     positionData: loginPerson.positionData,
    //   },
    //   sendDatabase: {
    //     task_id: loginPerson.task_id,
    //     comment: "",
    //     datenow: null,
    //     username: loginPerson.username,
    //     task_status: loginPerson.task_status,
    //   }
    // }  

    // console.log(state);
    // state.get.sendDatabase.task_placename = loginPerson.task_placename;
    // state.login.task_id = loginPerson.task_id;
    // state.login.positionData = loginPerson.positionData;
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

    console.log(login);
    
    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position/login`, {
        params: login,
        // timeout: 4000, 
      })
      .then((returnData) => {
        const loginData = returnData.data;
        console.log(loginData);
        if (loginData?.login[0]?.status != "false") {
          Toast("登陆成功");
          // 录入数据
          context.commit("loginIn", {loginPerson: loginData.login[0]});
          context.dispatch("loginStorage");
          window.sessionStorage.setItem("loginData", JSON.stringify(loginData.login[0]));
          Router.push("/home/mine");
        } 
        else {
          Toast("登陆失败");
        }
      })
      .catch(function (error) {
        Toast("你的网速过慢或服务出现了问题");
      })
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
    this.loginStor
    context.commit("setToken", "");
    context.commit("setRefreshToken", "");
    context.commit("setUserInfo", {});
  },
  
  // 注册
  registerAccount(context, userInfo) {
    let { Toast, Router, register } = {
      Toast: userInfo.Toast,
      Router: userInfo.Router,
      register: userInfo.register
    };
    
    // http://127.0.0.1:8000/api/position/register?user_username=edqd&user_nth=201824803057&user_password=1234

    register = {
      user_username: register.username,
      user_nth: register.nth,
      user_password: register.password
    }

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
