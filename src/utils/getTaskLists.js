/*
 * @Author: 王朋坤
 * @Date: 2022-04-05 19:42:45
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-04-08 11:33:57
 * @FilePath: /graduation-project-master/src/utils/getTaskLists.js
 * @Description: 
 */
import { convertDate } from "@/utils/date.js";

export function getTaskLists(tasks, userinformation) {
  console.log(tasks);
  // 一维数组
  const singlestamptaskArray = [
  ];
  tasks.forEach((taskitem) => {
    taskitem.Results.forEach((taskitemperson) => {
      singlestamptaskArray.push({
        id: taskitem.id,
        topic: taskitem.topic,
        Wifis: taskitem.Wifis,
        Places: taskitem.Places,
        serverplacename: taskitem.serverplacename,
        serverplaceradius: 100,
        key: Date.now(),
        startstamp: taskitemperson.startstamp,
        beginstamp: taskitemperson.startstamp - taskitemperson.previousstamp,
        endstamp: taskitemperson.startstamp + taskitemperson.afterstamp,
        status: taskitemperson.status,
        statusmark: taskitemperson.statusmark,
        studynth: taskitemperson.studynth,
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
        userwifimark: 0,
        userplacemark: 0,
        usertimemark: 0,
        userserverplacenamemark: 0,
        createuser: taskitem.createuser
      });
    });
  });

  console.log(singlestamptaskArray);
  return singlestamptaskArray;
}

export function tasklistsToPagelist(judgeArray) {
  let tasklists = [];
  let icon = "#icon-kaishibofang";
  let status = "未打卡";
  judgeArray.forEach((judgetaskitem) => {
    if (judgetaskitem.statusmark === 1) {
      icon = "#icon-chaxun";
      status = "打卡成功";
    } else if (judgetaskitem.statusmark == 0) {
      icon = "#icon-kaishibofang";
      status = "未打卡";
    } else {
      icon = "#icon-bianjiputong";
      status = judgetaskitem.status;
    }
    // console.log(judgetaskitem, "judgetaskitem");
    tasklists.push({
      id: judgetaskitem.id,
      key: Date.now() + Math.random(),
      status,
      statusmark: judgetaskitem.statusmark,
      createuser: judgetaskitem.createuser,
      time: convertDate(judgetaskitem.startstamp),
      startstamp: judgetaskitem.startstamp,
      topic: judgetaskitem.topic,
      icon,
      endstamp: judgetaskitem.endstamp,
      beginstamp: judgetaskitem.beginstamp,
      geometry: judgetaskitem.geometry,
      Places: judgetaskitem.Places,
      Wifis: judgetaskitem.Wifis,
      serverplacename: judgetaskitem.serverplacename,
      serverplaceradius: judgetaskitem.serverplaceradius,
      studynth: judgetaskitem.studynth,
      taskid: judgetaskitem.id,
      comment: ""
    });
  });
  return tasklists;
}