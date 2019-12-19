
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const envList = require("../config/dev.env.js");
const devConfig = merge(commonConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./dist",
    publicPath: "/",
    historyApiFallback: true,
    open: true,
    overlay: true,
    proxy: {
      "/project": {
        target: "http://127.0.0.1:8888",
        pathRewrite: { "^/project": "/" }, // 开头的 /project 路径，会被替换为http://127.0.0.1:8888/路径
        changeOrigin: true // 突破网站对爬虫的限制, 一般都要开启
      },
      "/api": {
        target: "http://localhost:5000" // 代理 mock 服务的请求, 相当于是 /api 开头的全部匹配到 http://localhost:5000/api
      }
    },
    hot: true,
    progress: true, // 编译的进度条
    compress: true // 自动压缩
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "postcss-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.envList": envList
    })
  ],
  output: {
    filename: "[name]_[hash:8].js",
    chunkFilename: "[name].chunk.js"
  }
});

module.exports = () => {
  return devConfig;
};
