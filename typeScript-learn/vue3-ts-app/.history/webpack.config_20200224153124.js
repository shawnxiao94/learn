/*
 * @Author: your name
 * @Date: 2020-02-24 13:18:30
 * @LastEditTime: 2020-02-24 15:31:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\webpack.config.js
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// import webpack from 'webpack'
// /**
//  * @type {webpack.Configuration}
// */

const config = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  devServer: {
    hot: true
  },
  optimization: {
    // 模版只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模版到函数中
    // concatenateModules: true,
    // 压缩输出结果
    // minimize: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config