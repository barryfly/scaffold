let path = require("path");
let utils = require("./utils");
let webpack = require("webpack");
let LodashWebpackPlugin = require('lodash-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let VueLoaderPlugin = require("vue-loader/lib/plugin");
let CreateRootFile = require("./plugins/create-root-file.js");
let currentProjectPath = utils.getNowProjectPath();

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, "../", dir);
}

module.exports = {
  resolve: {
    extensions: [".js", ".vue", ".json", ".less"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      _app: resolve("src/app"),
      _main: resolve("src/main"),
      _assets: resolve("src/assets"),
      _components: resolve("src/components"),
      _common: resolve("src/common"),
      _stores: resolve("src/stores"),
      _ant_design: resolve("src/common/ant-design"),
      _utils: resolve("src/utils"),
      _apis: resolve("src/apis"),
      _views: resolve("src/views"),
      _locale: resolve("src/locale"),
      _router: resolve("src/router"),
    },
  },

  entry: {
    app: ["_main"],
  },

  output: {
    publicPath: "/",
    path: path.resolve(utils.getNowProjectPath(), "dist"),
    filename: "source/[name].js?v=[fullhash]",
  },

  optimization: {
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
        common: {
          name: "common",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?(vue|vue-router|axios|dayjs)/,
        },
        charts: {
          name: "charts",
          priority: 80,
          test: /[\\/]node_modules[\\/]_?echarts/,
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true,
        },
      },
      {
        test: /inject\.router\.js$/,
        loader: resolve("build/loaders/router-loader.js"),
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("../@jw"),
          path.join(currentProjectPath, "common"),
          path.join(currentProjectPath, "components"),
          path.join(currentProjectPath, "apis"),
          path.join(currentProjectPath, "utils"),
          path.join(currentProjectPath, "views"),
          path.join(currentProjectPath, "locale"),
          path.join(currentProjectPath, "router"),
          path.join(currentProjectPath, "stores"),
        ],
        options: {plugins: ['lodash']}
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 2500,
          esModule: false,
          name: "source/static/[name].[hash:10].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|svg|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 5000,
          name: "source/static/[name].[hash:10].[ext]",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),

    new LodashWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "source/static/[name].css?v=[hash:10]",
    }),

    new webpack.ids.HashedModuleIdsPlugin(),
    new VueLoaderPlugin(),
    new CreateRootFile({
      entry: ["source/common.js", "source/base.js"],
      output: "source/common.js",
    }),

    new CreateRootFile({
      entry: ["source/manifest.js"],
      src: ["src/entry.js"],
      output: "source/main.js",
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
};
