let path = require("path");
let utils = require("./utils");
let webpack = require("webpack");
let { merge } = require("webpack-merge");
let baseWebpackConfig = require("./webpack.base.conf");
let FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");

let webpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  stats: "errors-only",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    quiet: true,
  },
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
    cacheDirectory: path.resolve(utils.getNowProjectPath(), ".cache"),
  },
});

module.exports = webpackConfig;
