/*
 * @Author: your name
 * @Date: 2021-09-24 21:27:50
 * @LastEditTime: 2021-09-27 16:58:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\vue.config.js
 */
// vue.config.js
//less文件的路径
// const path = require('path');
// const myTheme = path.resolve(__dirname, "./src/assets/less/vantChange.less");

// module.exports = {
//     css: {
//         loaderOptions: {
//             less: {
//                 modifyVars: {
//                     hack: `true; @import "${myTheme}";`
//                 }
//             },
//         }
//     },
// }

// // vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        // lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'tabbar-height': '70px',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
          },
        // },
      },
    },
  },
};