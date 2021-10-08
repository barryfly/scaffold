#!/usr/bin/env node
/**
 * 开发模式打包脚本
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let copySourceCode = [];

let fs = require("fs");
let opn = require("opn");
let path = require("path");
let utils = require("./utils");
let express = require("express");
let webpack = require("webpack");
let { merge } = require("webpack-merge");
let scaffoldConfigChecker = require("./scaffold-config-check");

let targetSystem = utils.getNowProjectName();
let targetSystemPath = utils.getNowProjectPath();
let distFolderPath = path.join(targetSystemPath, "dist");

let webpackAliasConfig = {
  alias: {
    [targetSystem]: targetSystemPath,
  },
};

let CopyWebpackPlugin = require("copy-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");

let webpackConfig = {};
let systemConfig = {};

scaffoldConfigChecker();
webpackConfig = require("./webpack.dev.conf");
systemConfig = require(path.join(targetSystemPath, "webpack.js"));

webpackConfig.entry.app = [
  "webpack-hot-middleware/client?reload=true&quiet=true",
].concat(webpackConfig.entry.app);

const SERVER_PORT = systemConfig.port || 80;
const SERVER_DOMAIN = systemConfig.domain || "test.jwis.cn";

copySourceCode = utils.toOutFromSourceLink(
  systemConfig.moveStaticSource,
  targetSystemPath
);

if (fs.existsSync(path.join(targetSystemPath, "favicon.ico"))) {
  copySourceCode.push({
    from: path.join(targetSystemPath, "favicon.ico"),
    to: path.resolve(distFolderPath, "config/favicon.ico"),
  });
}

webpackConfig = merge(webpackConfig, systemConfig.package || {}, {
  resolve: webpackAliasConfig,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(targetSystemPath, "scaffold.json"),
          to: path.resolve(distFolderPath, "config/scaffold.json"),
        },
      ].concat(copySourceCode),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: utils.getIndexHtml(),
      //path.resolve(__dirname, '../index.ejs'),
      inject: false,
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
      },
      randomId: Math.random() * 10000000,
      outSourceLink: utils.toOutSourceLink(systemConfig.moveStaticSource),
      outerCssLink: systemConfig.outerCssLink || [],
    }),
  ],
});

// 开启服务
let app = express();
let compiler = webpack(webpackConfig);

//运行Server
let devMiddleware = require("webpack-dev-middleware")(compiler);

//实现代码热部署
let hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: false,
  heartbeat: 2000,
});

app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(SERVER_PORT, () => {
  let url = `http://${SERVER_DOMAIN}:` + SERVER_PORT;
  console.log("run server " + url + "\n");
  opn(url);
});
