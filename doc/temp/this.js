/*
 * @Author: your name
 * @Date: 2021-11-22 22:58:01
 * @LastEditTime: 2021-11-22 23:07:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/doc/temp/this.js
 */

() => {
  console.log(this)
}

setTimeout(() => {
  console.log(this)

}, 0)

// (function (aa){
//   console.log(arguments)
//   //code
// })("12", "333")