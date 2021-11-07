/*
 * @Author: your name
 * @Date: 2021-09-24 21:27:50
 * @LastEditTime: 2021-11-07 15:55:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \page-view\vue.config.js
 */

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
      "/api/position": {
        target: 'http://127.0.0.1:8000',
        // target: "https://www.pkcile.cn/advsk/sj/sj13/public/index.php/",
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
      },
    },
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.externals = {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        "@turf/turf": "turf",
        "leaflet": "L" 
      };
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin)
      const cdn = {
        css: [
          "//unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        ],
        js: [
          "//unpkg.com/vue@2.6.10/dist/vue.min.js", 
          "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
          "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
          "//unpkg.com/axios@0.19.0/dist/axios.min.js",
          "//unpkg.com/leaflet@1.7.1/dist/leaflet.js",
          "//unpkg.com/@turf/turf"
        ]
      };
      config.plugin("html").tap(args => {
        // html中添加cdn
        args[0].cdn = cdn;
        return args;
      });
    }
  }
};
