const { Configuration } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const path = require("path");
const rules = require("./config/rules");
/**
 * @type {Configuration}
 */

module.exports = (env, args) => {
  const mode = args.mode;
  const pages = env.pages.split(",");
  const srcPagesDir = path.resolve(__dirname, "src/pages/");
  const entry = {};
  pages.forEach(
    (el) => (entry[el] = path.resolve(srcPagesDir, el, "main.js"))
  );
  const config = {
    entry,
    mode,
    output: {
      filename: "[name].js",
      publicPath: "/",
      clean: true,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          exclude: /node_modules/,
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
      splitChunks: {
        name: "verdor",
        minSize: 20000,
        maxSize: 1024 * 500,
        chunks: "all",
        cacheGroups: {
          defaultVendors: {
            filename: "[name].bundle.js",
          },
        },
      },
    },
    module: {
      rules,
    },
    resolve: {
      extensions: [".js", ".vue"],
      alias: {},
    },
    externals: {
      vue: "Vue",
      "element-plus": "ElementPlus",
      vuex: "Vuex",
    },
    plugins: [
      ...pages.map((pageName) => {
        return new HtmlWebpackPlugin({
          filename: `${pageName}/index.html`,
          chunks: [pageName],
          template: path.resolve(__dirname, "src/index.html"),
        });
      }),
      // 提取单独的CSS
      new MiniCssExtractPlugin({
        filename: "[name]/main.[contenthash:10].css",
      }),
      // 压缩css
      new CssMinimizerPlugin(),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin()
    ],
    devServer: {
      compress: true,
      port: 3033,
      host: "127.0.0.1",
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    devtool: mode === "development" ? "eval-source-map" : "eval",
  };

  return config;
};
