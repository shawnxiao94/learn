
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
// 开发环境的配置项
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 监听的文件目录
    contentBase: './dist',
    // 非hash路由模式时解决刷新页面404问题，=> 重定向index.html页面
    historyApiFallback: true,
    open: true,
    // 浏览器页面上显示错误
    overlay: true,
    proxy: {
      '/react/api': {
        target: 'http://www.dell-lee.com',
        pathRewrite: {
          'header.json': 'demo.json',
        },
        changeOrigin: true // 突破网站对爬虫的限制, 一般都要开启
      },
    },
    hot: true,
    progress: true, // 编译的进度条
    compress: true // 自动压缩
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            },
          },
          {
            loader: 'postcss-loader'
          },
          'less-loader'         
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ],
  },
  plugins: [
    // 支持模块热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    // 输出名称,未配置的话默认是入口文件原名(main.js)，用占位符的话就可以使用设置的名字且支持多个打包文件命名
    filename: '[name]_[hash:8].js',
    // 在JS文件中间接引入的JS文件会打包成这种格式，这叫做chunk
    chunkFilename: '[name].chunk.js',
  },
};

// 导出合并公共配置与开发配置的配置
module.exports = () => {
  const envList = require('../config/dev.env.js');
  devConfig.plugins.push(
    // 注入环境变量
    new webpack.DefinePlugin({
      'process.env.envList': envList,
    }),
  );
  return merge(commonConfig, devConfig);
};