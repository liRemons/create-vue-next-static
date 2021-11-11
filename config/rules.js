const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const postcssLoader = {
  loader: "postcss-loader",
};

const rules = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, "src"),
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  {
    test: /\.vue$/,
    exclude: /node_modules/,
    use: ["vue-loader"],
  },
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", postcssLoader],
  },
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      postcssLoader,
      "less-loader",
    ],
  },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "html-loader",
        options: {
          esModule: true,
        },
      },
    ],
  },
  {
    test: /\.(jpe?g|png|gif|webp)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 1024 * 8,
          name: "[name].[ext]",
          esModule: false,
          outputPath: "static/assets/images",
        },
      },
    ],
  },
  {
    test: /.(pdf|doc|node)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          publicPath: "static/assets/others",
        },
      },
    ],
  },
];

module.exports = rules;
