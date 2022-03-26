/*
 * @Author: 王朋坤
 * @Date: 2022-03-26 11:13:26
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-26 14:33:25
 * @FilePath: /graduation-project-master/src/utils/judgetasks.js
 * @Description: 
 */

export class TaskDealWith {
  initData;
  forminitData;
  singlestamptaskArray;
  wifijudgemark;
  timejudgemark;
  geometryjudgemark;

  constructor({ tasks, geometry, placeinformation, wifis }) {
    this.forminitData = { tasks, geometry, placeinformation, wifis };
    console.log(this.forminit())
    return this;
  }

  forminit() {
    // 一维数组
    const singlestamptaskArray = [
    ];

    const { tasks, geometry } =
      this.forminitData;

    tasks.forEach((taskitem) => {
      taskitem.Results.forEach((taskitemperson) => {
        singlestamptaskArray.push({
          id: taskitem.id,
          topic: taskitem.topic,
          Wifis: taskitem.Wifis,
          Places: taskitem.Places,
          key: Date.now(),
          startstamp: taskitemperson.startstamp,
          beginstamp:
            taskitemperson.startstamp - taskitemperson.previousstamp,
          endstamp: taskitemperson.startstamp + taskitemperson.afterstamp,
          status: taskitemperson.status,
          statusmark: taskitemperson.statusmark,
          studynth: taskitemperson.studynth,
          geometry: {
            type: "Point",
            coordinates: [geometry?.longitude, geometry?.latitude],
          },
          userwifimark: 0,
          userplacemark: 0,
          usertimemark: 0,
          createuser: taskitem.createuser
        });
      });
    });

    this.singlestamptaskArray = singlestamptaskArray;
    return this;
  }

  wifijudge() {
    this.wifijudge = 1;
    return this
  }

  geometryjudge() {
    const { geometry } = this.forminitData;

    this.singlestamptaskArray.map((singlestamptaskArrayitem) => {
      singlestamptaskArrayitem.Places.forEach((placesitem) => {
        let distance = flatearthDistance(
          {
            latitude: geometry?.latitude,
            longitude: geometry?.longitude,
          },
          {
            latitude: placesitem.geometry.coordinates[1],
            longitude: placesitem.geometry.coordinates[0],
          }
        );
        if (distance < placesitem.radius) {
          singlestamptaskArrayitem.userplacemark += 1;
        } else {
          console.log("距离过大");
        }
      });
    });

    this.geometryjudgemark = 1;

    return this;
  }

  timejudge() {
    this.singlestamptaskArray.map((singlestamptaskArrayitem) => {
      if (Date.now() > singlestamptaskArrayitem) {
        // 迟到了
        singlestamptaskArrayitem.usertimemark = -1;
      } else {
        // 打卡正常
        singlestamptaskArrayitem.usertimemark = 1;
      }
    });

    this.timejudgemark = 1;

    return this;
  }

  updateresult() {
    const _this = this;
    return new Promise((resolve) => {
      const wifijudgemark = this.wifijudgemark;
      const timejudgemark = this.timejudgemark;
      const geometryjudgemark = this.geometryjudgemark;

      this.singlestamptaskArray.map((singlestamptaskArrayitem) => {
        // 只使用位置、时间来显示打卡情况
        if (timejudgemark && geometryjudgemark && !wifijudgemark) {
          console.log(
            singlestamptaskArrayitem.userplacemark,
            singlestamptaskArrayitem.usertimemark
          );
          if (
            singlestamptaskArrayitem.usertimemark == 1 &&
            singlestamptaskArrayitem.userplacemark > 0
          ) {
            singlestamptaskArrayitem.statusmark = 1;
            singlestamptaskArrayitem.status = "打卡成功";
          } else if (
            singlestamptaskArrayitem.usertimemark == -1 &&
            singlestamptaskArrayitem.userplacemark > 0
          ) {
            singlestamptaskArrayitem.statusmark = -1;
            singlestamptaskArrayitem.status = "迟到了";
          } else if (
            singlestamptaskArrayitem.usertimemark == -1 &&
            singlestamptaskArrayitem.userplacemark == 0
          ) {
            singlestamptaskArrayitem.statusmark = -1;
            singlestamptaskArrayitem.status = "迟到了，位置判断失败";
          } else if (
            singlestamptaskArrayitem.usertimemark == 1 &&
            singlestamptaskArrayitem.userplacemark == 0
          ) {
            singlestamptaskArrayitem.statusmark = -1;
            singlestamptaskArrayitem.status = "位置判断失败";
          }
        } else {
        }
      });

      const singlestamptaskArraySend = [];

      this.singlestamptaskArray.forEach((singlestamptaskArrayitem) => {
        console.log(singlestamptaskArrayitem.geometry);
        singlestamptaskArraySend.push({
          geometry: singlestamptaskArrayitem.geometry,
          taskid: singlestamptaskArrayitem.id,
          studynth: singlestamptaskArrayitem.studynth,
          startstamp: singlestamptaskArrayitem.startstamp,
          topic: singlestamptaskArrayitem.topic,
          status: singlestamptaskArrayitem.status,
          statusmark: singlestamptaskArrayitem.statusmark,
          userplacemark: singlestamptaskArrayitem.userplacemark,
          usertimemark: singlestamptaskArrayitem.usertimemark,
          userwifimark: singlestamptaskArrayitem.userwifimark,
        });
      });

      console.log(singlestamptaskArraySend);

      axios
        .get(`${process.env.VUE_APP_POSITION_PATH}/result/taskSign`, {
          params: { sendArray: singlestamptaskArraySend },
        })
        .then((returnData) => {
          // 
          let signResult = {
            result: null,
            status: {
              mark: 0,
              info: "无打卡任务"
            }
          }
          // 无打卡任务
          // 有打卡任务，打卡任务，单个任务打卡、多个任务打卡成功
          if(singlestamptaskArraySend.length == 0) {
            signResult = {
              result: null,
              status: {
                mark: 0,
                infor: "无打卡任务"
              }
            }
          }
          else if(singlestamptaskArraySend.length == 1){
            signResult = {
              result: returnData.data.result,
              status: {
                mark: returnData.data.status.mark,
                infor: returnData.data.status.infor
              }
            }
          }
          else {
            signResult = {
              result: returnData.data.result,
              status: {
                mark: 2,
                infor: "多个任务提交完成"
              }
            }
          }

        
          resolve({
            signResult: signResult,
            signJudge: _this.singlestamptaskArray,
            signInit: _this.forminitData,
          });
        });

      return this;
    });
  }

  showresult() {
    return this;
  }

  judgeArrayToTasklists() {
    let tasklists = [];
    let icon = "#icon-kaishibofang";
    judgeArray.forEach((judgetaskitem) => {
      if (judgetaskitem.statusmark === 1) {
        icon = "#icon-chaxun";
      } else if (judgetaskitem.statusmark == 0) {
        icon = "#icon-kaishibofang";
      } else {
        icon = "#icon-bianjiputong";
      }
      tasklists.push({
        id: judgetaskitem.id,
        key: Date.now() + Math.random(),
        status: judgetaskitem.status,
        createuser: judgetaskitem.createuser,
        time: convertDate(judgetaskitem.startstamp),
        topic: judgetaskitem.topic,
        icon,
      });
    });
    return this;
  }
}