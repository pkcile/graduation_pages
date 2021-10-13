/*
 * @Author: your name
 * @Date: 2021-09-24 21:27:50
 * @LastEditTime: 2021-10-13 10:28:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\vue.config.js
 */
// vue.config.js
//less文件的路径
const path = require('path');
const myTheme = path.resolve(__dirname, "./src/assets/less/vantChange.less");

module.exports = {
  productionSourceMap: true,     // 打开方便调试
  css: {
    loaderOptions: {
      less: {
          modifyVars: {
            // 直接覆盖变量
            // 'tabbar-height': '70px',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${myTheme}";`,
          }
      },
    },
  },
};