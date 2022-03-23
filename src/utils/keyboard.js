/*
 * @Author: 王朋坤
 * @Date: 2022-03-23 11:24:06
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-23 11:24:47
 * @FilePath: /graduation-project-master/src/utils/keybord.js
 * @Description: 
 */

document.addEventListener("keydown", function(event) {
  //取消浏览器键盘默认行为（window.event.returnValue = false）、keycode key 键盘数据存取、
  event.preventDefault();         
},false); 