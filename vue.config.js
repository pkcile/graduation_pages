/*
 * @Author: your name
 * @Date: 2021-09-24 21:27:50
 * @LastEditTime: 2022-04-22 22:21:23
 * @LastEditors: 王朋坤
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/vue.config.js
 */
const webpack = require("webpack");
const HashedModuleIdsPlugin = webpack.HashedModuleIdsPlugin;
const path = require("path");
const myTheme = path.resolve(
  __dirname,
  "./src/assets/style/reset/vantChange.less"
);
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  productionSourceMap: process.env.NODE_ENV == "development" ? true : false,
  publicPath: "./",
  outputDir: "docs",
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
        target: "https://temp.pkcile.cn/",
        changeOrigin: true,
      },
      "/task": {
        target: "https://temp.pkcile.cn/",
        changeOrigin: true,
      },
      "/result": {
        target: "https://temp.pkcile.cn/",
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
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.externals = {
        "@turf/turf": "turf",
        // leaflet: "L",
        // vue: "Vue",
        // "vue-router": "VueRouter",
        // vuex: "Vuex",
        // axios: "axios",
      };


      config.plugins = [
        ...config.plugins,
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            }
          },
        }),
        new HashedModuleIdsPlugin()
        // new CompressionPlugin({
        //   test: /\.js$|\.html$|\.css/, // 匹配文件
        //   threshold: 10240, // 对大于此值的文件进行压缩
        //   deleteOriginalAssets: false, // 是否删除原始文件资源
        //   // ...
        // }),
      ];

      
      // config.optimization = {
      //   splitChunks: {
      //     // 分割代码块
      //     cacheGroups: {
      //       vendor: {
      //         //第三方库抽离
      //         chunks: "all",
      //         test: /node_modules/,
      //         name: "vendor",
      //         minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
      //         maxInitialRequests: 5,
      //         minSize: 0, //大于0个字节
      //         priority: 100, //权重
      //       },
      //       common: {
      //         //公用模块抽离
      //         chunks: "all",
      //         test: /[\\/]src[\\/]js[\\/]/,
      //         name: "common",
      //         minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
      //         maxInitialRequests: 5,
      //         minSize: 0, //大于0个字节
      //         priority: 60,
      //       },
      //       styles: {
      //         //样式抽离
      //         name: "styles",
      //         test: /\.(sa|sc|c)ss$/,
      //         chunks: "all",
      //         enforce: true,
      //       },
      //       runtimeChunk: {
      //         name: "manifest",
      //       },
      //     },
      //   },
      // };
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      const cdn = {
        css: [
          // "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/leaflet/1.7.1/leaflet.min.css"
        ],
        js: [
          // "//lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.min.js",
          // "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
          // "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
          // "//unpkg.com/axios@0.19.0/dist/axios.min.js",
          // "//unpkg.com/leaflet@1.7.1/dist/leaflet.js",
          "//lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/Turf.js/6.5.0/turf.min.js",
        ],
      };

      config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);

      config.plugin("chunkPlugin").use(webpack.optimize.LimitChunkCountPlugin, [
        {
          maxChunks: 5,
          // minChunkSize: 2000
        },
      ]);


      config.plugin("html").tap((args) => {
        // html中添加cdn
        args[0].cdn = cdn;
        return args;
      });

      config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
    }
  },
};
