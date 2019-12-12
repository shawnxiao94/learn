const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //背景图路径
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            },
          },
          'postcss-loader',
          'stylus-loader'
        ],
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //背景图路径
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
        ],
        include: path.resolve(__dirname, '../src')
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    // tree-shaking会默认移除 JavaScript 上下文中的未引用的代码，用来达到减轻重量的思想，tree-shaking通过 package.json 的 "sideEffects" 属性判定哪个文件具有副作用，
    // 当 "sideEffects" ：false时，项目中未被引用到的文件会被移除判定均无副作用，就会把没有被引用的代码从环境中自动移除
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    }),
    new UglifyJsPlugin({
      exclude: /\.min\.js$/,
      cache: true,
      parallel: true, // 开启并行压缩，充分利用cpu
      sourceMap: true,
      extractComments: false, // 移除注释
      uglifyOptions: {
        unused: true,
        warnings: false,
        drop_debugger: true,
        compress: {}
      }
    }), 
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      cache: true,
      algorithm: 'gzip',
      test: /\.(js|css|html|svg|png|jpg|jpeg)$/,
      threshold: 10240, // 只处理比这个值大的资源。按字节计算。
      minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理（minRatio = 压缩大小 / 原始大小）
      deleteOriginalAssets: false // 不删除原始资源. nginx会先判断是否有.gz后缀的相同文件(这就表示需要两个文件，一个是压缩前的，一个是压缩后的。)
      // 有的话，就直接返回，nginx自己不再进行压缩处理。 如果删除源文件，那么 NGINX 处理会有问题的！！！
    }),       
    // 设置wpa离线缓存
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
};

module.exports = (env) => {
  let envList;
  if (env && env.test) {
    envList = require('../config/test.env.js');
  } else {
    envList = require('../config/prod.env.js');
  }
  prodConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.envList': envList,
    }),
  );
  return merge(commonConfig, prodConfig);
};