let webpack = require("webpack");
let { merge } = require("webpack-merge");
let baseWebpackConfig = require("./webpack.base.conf");
let UselessFileDel = require("./plugins/useless-file-delete.js");
// let { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

let webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new UselessFileDel({
      paths: ["dist/source/manifest.js"],
    }),
    new UselessFileDel({
      paths: ["dist/source/base.js"],
    }),
    // new BundleAnalyzerPlugin(),
  ],
});

module.exports = webpackConfig;
