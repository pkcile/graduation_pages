/*
 * @Author: your name
 * @Date: 2021-10-14 22:54:00
 * @LastEditTime: 2022-04-13 02:14:40
 * @LastEditors: 王朋坤
 * @Description: 用户登陆信息
 * @FilePath: /graduation-project-master/src/store/modules/User.js
 */
import * as turf from "@turf/turf";
import axios from "axios";
// import {  } from "vant";
import { Toast, Notify } from "vant";
// const state = {
//   // 登陆数据
//   login: {
//     userinformation: null,
//     tasks: null,
//     // getGeometry: null,
//     // getGeometryInformation: null,
//     // getWifis: null
//   },

//   // 动态获取
//   get: {
//     wifis: [],
//     location: {
//       longitude: null,
//       latitude: null,
//       accuracy: null,
//       information: null
//     },
//   },

//   // 任务签到打卡数据
//   taskSign: {
//     judgeArray: [],
//     signResult: []
//   },

//   // websocket 通知
//   websocketnotice: "打卡提示信息"

// };

const state = {
  login: {
    userinformation: null,
    // {
    //   username: "201824803050",
    //   name: "管理员1号",
    //   studynth: "201824803050",
    //   register: "2022-03-18 07:25:08",
    //   registertimestamp: 1647559508896,
    //   logintimestamp: 1647559508896,
    //   imglink:
    //     "https://portrait.gitee.com/uploads/avatars/user/2511/7534207_pkcile_1616390370.png!avatar200",
    //   showinfor: "默认签名",
    //   role: "管理员",
    // },
    tasks: null,
    // [
    //   {
    //     id: 337,
    //     topic: "2022-疫情核酸检测",
    //     createstamp: 1649155723974,
    //     createuser: "201824803050",
    //     serverplacename: "王小楼村",
    //     serverplaceradius: 200,
    //     Places: [
    //       {
    //         taskid: 337,
    //         placesnth: 110,
    //         geometry: {
    //           type: "Point",
    //           coordinates: [115.30551949177608, 36.11029686922546],
    //           // coordinates: [0, 0]
    //         },
    //         radius: 10000,
    //         createstamp: 1649151110614,
    //         createuser: "wpk"
    //       },
    //     ],
    //     Wifis: [
    //       {
    //         wifisnth: 104,
    //         ssid: "Tenda_A9E670",
    //         level: -49,
    //         bssid: "e8:65:d4:a9:e6:70",
    //         collectstamp: 1649151110615,
    //         collectuser: "pkcile",
    //         version: 0,
    //         wifistopic: "",
    //         geometry: null,
    //         taskId: 337,
    //       },
    //       {
    //         wifisnth: 105,
    //         ssid: "pkcile",
    //         level: -67,
    //         bssid: "c2:65:c7:d9:ad:78",
    //         collectstamp: 1649151110615,
    //         collectuser: "pkcile",
    //         version: 0,
    //         wifistopic: "",
    //         geometry: null,
    //         taskId: 337,
    //       },
    //       {
    //         wifisnth: 106,
    //         ssid: "pkcile",
    //         level: -83,
    //         bssid: "c2:65:c7:d9:ad:7c",
    //         collectstamp: 1649151110615,
    //         collectuser: "pkcile",
    //         version: 0,
    //         wifistopic: "",
    //         geometry: null,
    //         taskId: 337,
    //       },
    //       {
    //         wifisnth: 107,
    //         ssid: "金豆豆",
    //         level: -74,
    //         bssid: "04:95:e6:77:d6:71",
    //         collectstamp: 1649151110615,
    //         collectuser: "pkcile",
    //         version: 0,
    //         wifistopic: "",
    //         geometry: null,
    //         taskId: 337,
    //       },
    //     ],
    //     Results: [
    //       {
    //         taskid: 337,
    //         studynth: "201824803050",
    //         startstamp: 1649155680000,
    //         previousstamp: 3000000,
    //         afterstamp: 1800000,
    //         status: "任务分发初始化",
    //         statusmark: 0,
    //         userwifimark: 0,
    //         userplacemark: 0,
    //         usertimemark: 0,
    //         geometry: null,
    //         comment: "",
    //         taskId: 337,
    //       },
    //     ],
    //   },
    // ],
  },
  taskSign: {
    judgeArray: [
      {
        id: 243,
        topic: "暑假打卡主题",
        Wifis: [],
        Places: [
          {
            taskid: 243,
            placesnth: 65,
            servermark: true,
            serverplacename: "地点",
            geometrymark: false,
            geometry: {
              type: "Point",
              coordinates: [-76.984722, 39.807222],
            },
            radius: 100,
            createstamp: 1648134253261,
            taskId: 243,
          },
        ],
        key: 1648263117567,
        startstamp: 1648263107707,
        beginstamp: 1648261107707,
        endstamp: 1648264907707,
        studynth: "1",
        geometry: { type: "Point", coordinates: [115.304657, 36.110565] },
        serverplacename: "王小楼村",
        serverplaceradius: 200,
        userwifimark: 0,
        userplacemark: 0,
        userplaceservermark: 0,
        usertimemark: 1,
        status: "位置判断失败",
        statusmark: -1,
      },
    ],
    signResult: {
      result: [[1]],
      status: { mark: -1, infor: "位置判断失败" },
    },
  },
  get: {
    wifi: [],
    geometry: {
      coordinates: null,
      type: "Point",
      accuracy: null
    }
  },
  // websocket 通知
  websocketnotice: "打卡提示信息",
  // 上次任务刷新时间
  taskinforlasttimestamp: null

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
    // console.log(param);
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
    // console.log("登录");
  },
  // 登陆选项
  loginStore(state, param) {
    this.state.User.login.userinformation = param.userinformation;
    this.state.User.login.tasks = param.tasks;
    this.state.User.login.getGeometry = param.getGeometry;
    this.state.User.login.getGeometryInformation = param.getGeometryInformation;
    this.state.User.login.getWifis = param.getWifis;

    sessionStorage.setItem("User", JSON.stringify(this.state.User));
  },
  // 任务信息查询选项
  taskQueryStore(state, param) {
      this.state.User.login.userinformation = param?.userinformation;
      this.state.User.login.tasks = param?.tasks;

      this.state.User.taskinforlasttimestamp = Date.now();
      sessionStorage.setItem("User", JSON.stringify(this.state.User));
      console.log(this.state.User);
      // Notify({type: "success", message: "任务查询成功"});
      // Toast("任务信息查询成功");
      
    },
  // wifi保存选项
  wifiStore(state, param) {
    console.log(param);
    this.state.User.get.wifi = param;
    sessionStorage.setItem("User", JSON.stringify(this.state.User));
  },
  // 位置保存选项
  geometryStore(state, param) {
    console.log(param);
    this.state.User.get.geometry = param;
    sessionStorage.setItem("User", JSON.stringify(this.state.User));
  },
  //
  taskSignStore(state, param) {
    this.state.User.taskSign.judgeArray = param.judgeArray;
    this.state.User.taskSign.signResult = param?.signResult;
    // console.log(this.state.User);

    sessionStorage.setItem("User", JSON.stringify(this.state.User));

    // console.log(sessionStorage.getItem("User"));
  },
  // 更新打卡结果
  taskSignResultStore(state, param) {
    // const {taskid, statusmark} = param;
    // this.state.User.login.tasks
    // const _this = this;
    // this.state.User.login.tasks.Result.map((item, index) => {
    //   if (item.taskid == taskid) {
    //     item.statusmark
    //   }
    // });
  },
  oneMethod() {
    // console.log("one method");
  },
  updateStatus() {
    // 更新请求
    const _this = this;
    if (this.state.User.login.userinformation) {
      sessionStorage.setItem("User", JSON.stringify(this.state.User));
    } else {
      if (JSON.parse(sessionStorage.getItem("User"))) {
        this.state.User = JSON.parse(sessionStorage.getItem("User"));
      } else {
        // console.log("x");
        Toast("需要重新登陆");
      }
      console.log(this.state.User);
    }
  },
};

const actions = {
  // 登录获取保存数据
  loginIn(context, userInfo) {
    const { Toast, Router, login } = {
      Toast: userInfo.Toast,
      Router: userInfo.Router,
      login: userInfo.login,
    };

    axios
      .get(`${process.env.VUE_APP_POSITION_PATH}/api/position`, {
        // params: login,
        // timeout: 4000,
      })
      .then((returnData) => {
        console.log(returnData);
      })
      .catch(function(error) {});
  },
  // 登陆数据持久化
  loginStorage(context, params) {
    axios.get("./school-building.geojson").then(function(initPosition) {
      window.localStorage.removeItem("initPositionData");
      window.localStorage.setItem(
        "initPositionData",
        JSON.stringify(initPosition.data)
      );
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
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
