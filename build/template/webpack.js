/**
 * 打包配置
 * 注意子项目中 package.resolve 配置无效，代码中引用尽量采用相对路径。
 */

let path = require("path");

module.exports = {
  /**
   * webpack 打包配置
   */
  package: {
    resolve: {
      alias: {
        components: path.resolve(__dirname, "components"),
        assets: path.resolve(__dirname, "assets"),
        common: path.resolve(__dirname, "common"),
        stores: path.resolve(__dirname, "stores"),
        views: path.resolve(__dirname, "views"),
        apis: path.resolve(__dirname, "apis"),
        utils: path.resolve(__dirname, "utils"),
        _ant_design: "common/ant-design",
        "@ant-design/icons/lib/dist$": path.resolve("common/ant-icons.js"),
      },
    },

    module: {},
  },

  /**
   * 调试打包，调试端口，调试地址---
   */
  port: 80,
  domain: "test.dev.jwis.cn",

  //支持NodeJs启动, 否则要以静态文件方式部署到nginx中
  isDockerPublish: true,

  //将项目需要用到比较大js库，打包进common.js
  extraLibs: [],

  /**
   * 不希望参与打包静态js
   * {
   *  from: 'static/index.js',
   *  to: 'source/static/index.js',
   *  autoImport: true
   * }
   */
  moveStaticSource: [],

  /**
   * 加载外网的CSS
   *  String
   */
  outerCssLink: [],
};
