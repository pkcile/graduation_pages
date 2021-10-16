/*
 * @Author: your name
 * @Date: 2021-10-16 13:47:47
 * @LastEditTime: 2021-10-16 13:48:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/api/submit/submit.js
 */


// http://127.0.0.1:8000/api/position/submit?username=pkcile&task_id=20&comment=评论内容&datenow=2021-07-05 08:42:29&task_status=2
import request from "@/api/request.js";

export default function submit(params){
  return request.get('/api/position/submit/', {params});
}