/*
 * @Author: your name
 * @Date: 2020-02-24 13:18:30
 * @LastEditTime: 2020-02-24 13:27:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\webpack.config.js
 */

const path = require('path')
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
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = config