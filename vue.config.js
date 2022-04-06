/*
 * @Author: your name
 * @Date: 2021-09-24 21:27:50
 * @LastEditTime: 2022-04-06 22:04:59
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
  productionSourceMap: process.env.NODE_ENV == "development" ? true: false,
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
        changeOrigin: true, 
      },
      "/task": {
        target: "http://localhost:9000/",
        changeOrigin: true, 
      },
    },
  },
  // configureWebpack: {
  //   outputDir: {
  //     // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
  //     filename: `js/[name].js`,
  //     chunkFilename: `js/[name].js`
  //   },
  //   plugins:[
  //     new webpack.optimize.LimitChunkCountPlugin({
  //       maxChunks: 1
  //     }) 
  //   ]
  // },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //         '@':path.resolve(__dirname, './src'),
  //         leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
  //         leaflet_marker: __dirname + "/node_modules/leaflet/dist/images/marker-icon.png",
  //         leaflet_marker_2x: __dirname + "/node_modules/leaflet/dist/images/marker-icon-2x.png",
  //         leaflet_marker_shadow: __dirname + "/node_modules/leaflet/dist/images/marker-shadow.png",
  //     }
  //   },
  // },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // config.externals = {
      //   vue: "Vue",
      //   "vue-router": "VueRouter",
      //   vuex: "Vuex",
      //   axios: "axios",
      //   "@turf/turf": "turf",
      //   "leaflet": "L" 
      // };
      
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      const cdn = {
        css: [
          "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/leaflet/1.7.1/leaflet.min.css"
        ],
        js: [
          "//lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.min.js", 
          "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
          "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
          "//unpkg.com/axios@0.19.0/dist/axios.min.js",
          "//unpkg.com/leaflet@1.7.1/dist/leaflet.js",
          "//unpkg.com/@turf/turf"
        ]
      };
      
      // config
      //   .plugin('webpack-bundle-analyzer')
      //   .use(BundleAnalyzerPlugin);

      config
        .plugin('chunkPlugin')
        .use(webpack.optimize.LimitChunkCountPlugin,[{
          maxChunks: 2, 
          // minChunkSize: 2000
        }]);
      
      // config.plugin("html").tap(args => {
      //   // html中添加cdn
      //   args[0].cdn = cdn;
      //   return args;
      // });

      
    }
  },
  
};
