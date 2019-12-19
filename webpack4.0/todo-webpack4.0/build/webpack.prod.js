// 抽离css文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩去重css文件插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 打包后的html里直接引用的css走这个配置
      filename: '[name].css',
      // 打包后的html里间接引用的css走这个配置
      chunkFilename: '[name].chunk.css',
    }),
    // 设置wpa离线缓存
    new WorkboxPlugin.GenerateSW({
      // Service Worker 被激活后使其立即获得页面控制权
      clientsClaim: true,
      // 强制等待中的 Service Worker 被激活
      skipWaiting: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader代替 style-loader使CSS文件单独打包出来
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              // 使@import导入的scss模块也能使用sass和postcss模块
              // 在样式里如果嵌套引入了其他的样式文件时，继续引入下面的两个loader进行打包
              importLoaders: 2,
              // 开启css模块化,这样子，在哪个模块里导入css，css则对某个模块起作用，不会影响全局,设置后，可对样式进行分别作用
              modules: true,
            },
          },
          // 将 Sass 编译成 CSS，默认使用 Node Sass
          'sass-loader',
          // postcss可以自动对css添加浏览器厂商前缀
          {
            loader: 'postcss-loader',
            // 根目录有了postcss.config.js文件的话这里就不需要再给options配置了
            options: {
              // 打包自动给样式添加浏览器兼容前缀 可以新建postcss.config.js里进行如下配置，也可以直接在下面配置也可以实现。
              // plugins: [
              // 	 //必须设置支持的浏览器才会自动添加前缀浏览器兼容
              // 	require("autoprefixer")({
              // 		browsers : ['last 100 versions']
              // 	})
              // ]
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  output: {
    // 入口文件都走该配置项
    // contenthash加这个防止页面缓存, 用处是如果文件没变动那么打包后的文件名hash也不会变，反之则会变
    filename: '[name].[contenthash].js',
    // 间接打包的文件走该配置
    chunkFilename: '[name].[contenthash].chunk.js',
  },
};

module.exports = prodConfig;
