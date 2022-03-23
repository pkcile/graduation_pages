/*
 * @Author: 王朋坤
 * @Date: 2022-03-23 11:24:06
 * @LastEditors: 王朋坤
 * @LastEditTime: 2022-03-23 16:13:02
 * @FilePath: /graduation-project-master/src/utils/keyboard.js
 * @Description: 
 */

export function cancelEventDefaultAll() {
  document.addEventListener("keydown", function(event) {
    //取消浏览器键盘默认行为（window.event.returnValue = false）、keycode key 键盘数据存取、
    event.preventDefault();     
        
  },false); 
}
// 取消保存ctrl s、 ctrl p默认浏览器事件
/*
  ctrl 17
  s 83
  p 80
*/
document.addEventListener("keydown", function(event) { 
  if((event.keyCode == 83 || event.keyCode == 80) && (event.ctrlKey || event.metaKey)) {
    window.event.returnValue = false;
  }
});
