#!/usr/bin/env node
/**
 * 生产模式打包脚本
 *
 * @author Barry@gmail.com
 * @date 2021-10-01
 */

let _ = require("lodash");
let fs = require("fs");
let rm = require("rimraf");
let path = require("path");
let utils = require("./utils");
let webpack = require("webpack");
let { merge } = require("webpack-merge");
let targetSystem = utils.getNowProjectName();
let targetSystemPath = utils.getNowProjectPath();
let distFolderPath = path.join(targetSystemPath, "dist");
// let isSourceMap = utils.hasArgu("map");

let HtmlWebpackPlugin = require("html-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
let copySourceCode = [];
let systemConfig = {};
let webpackConfig = {};
let webpackAliasConfig = {
  alias: {
    [targetSystem]: targetSystemPath,
  },
};

webpackConfig = require("./webpack.prod.conf");
systemConfig = require(path.join(targetSystemPath, "webpack.js"));
copySourceCode = utils.toOutFromSourceLink(
  systemConfig.moveStaticSource,
  targetSystemPath
);

if (systemConfig.isDockerPublish) {
  if (fs.existsSync(path.resolve(targetSystemPath, "node-wrapper"))) {
    copySourceCode.push({
      from: path.resolve(targetSystemPath, "node-wrapper/"),
      to: path.resolve(distFolderPath),
    });
  } else {
    copySourceCode.push({
      from: path.resolve(__dirname, "../node-wrapper/"),
      to: path.resolve(distFolderPath),
    });
  }
}

if (fs.existsSync(path.resolve(targetSystemPath, "favicon.ico"))) {
  copySourceCode.push({
    from: path.resolve(targetSystemPath, "favicon.ico"),
    to: path.resolve(distFolderPath, "config/favicon.ico"),
  });
}

webpackConfig = merge(webpackConfig, systemConfig.package || {}, {
  resolve: webpackAliasConfig,
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.join(targetSystemPath, "scaffold.json"),
            to: path.resolve(distFolderPath, "config/scaffold.json"),
            transform(content) {
              let contentObj = new Function(`return ${content}`)();

              return JSON.stringify(contentObj, function (key, value) {
                //移除配置文件中注釋
                if (_.isString(key) && key.indexOf("//") === 0) {
                  return undefined;
                }

                return value;
              });
            },
          },
        ].concat(copySourceCode),
      },
      { logLevel: "silent" }
    ),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: utils.getIndexHtml(),
      //path.resolve(__dirname,'../index.ejs'),
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      randomId: Math.random() * 10000000,
      outSourceLink: utils.toOutSourceLink(systemConfig.moveStaticSource),
      outerCssLink: systemConfig.outerCssLink || [],
    }),
  ],
});

rm(distFolderPath, (err) => {
  if (err) throw err;

  console.log("begin to webpack...");

  webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + "\n\n"
    );

    console.log(" Build complete.\n");
  });
});
