/*
 * @Author: your name
 * @Date: 2021-09-24 21:27:50
 * @LastEditTime: 2022-03-14 23:31:31
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/vue.config.js
 */
const webpack = require('webpack');
const path = require("path");
const myTheme = path.resolve(
  __dirname,
  "./src/assets/style/reset/vantChange.less"
);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  productionSourceMap: process.env.NODE_ENV == "development" ? true: true,
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "./static",
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'tabbar-height': '70px',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${myTheme}";`,
        },
      },
    },
  },
  devServer: {
    proxy: {
      "/user": {
        target: "http://localhost:9000/",
        changeOrigin: false, 
      },
      "/task": {
        target: "http://localhost:9000/",
        changeOrigin: true, 
      },
    },
  },
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`
    },
    plugins:[
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      // new webpack.DllReferencePlugin({
      //   context: __dirname,
      //   manifest: require("./lib/dist/manifest.json"),
      //   name: "zzzlib"
      // })
      
    ]
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     config.externals = {
  //       vue: "Vue",
  //       "vue-router": "VueRouter",
  //       vuex: "Vuex",
  //       axios: "axios",
  //       "@turf/turf": "turf",
  //       "leaflet": "L" 
  //     };
  //   }
  // },
  // chainWebpack: (config) => {
  //   if (process.env.NODE_ENV === "production") {
  //     config
  //       .plugin('webpack-bundle-analyzer')
  //       .use(BundleAnalyzerPlugin)
  //     const cdn = {
  //       css: [
  //         "//unpkg.com/leaflet@1.7.1/dist/leaflet.css"
  //       ],
  //       js: [
  //         "//unpkg.com/vue@2.6.10/dist/vue.min.js", 
  //         "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
  //         "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
  //         "//unpkg.com/axios@0.19.0/dist/axios.min.js",
  //         "//unpkg.com/leaflet@1.7.1/dist/leaflet.js",
  //         "//unpkg.com/@turf/turf"
  //       ]
  //     };
  //     config.plugin("html").tap(args => {
  //       // html中添加cdn
  //       args[0].cdn = cdn;
  //       return args;
  //     });
  //   }
  // }
};
