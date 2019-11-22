const webpack = require('webpack')

const devConfig = {
  mode: 'development', // 开发模式默认开启sourceMap
  devtool: 'cheap-module-eval-source-map', // 设置为none可以关闭sourcemap,
  devServer: {
    contentBase: './dist', // 监听的文件
    open: true, // 启动webpack-dev-server 时自动打开浏览器
    proxy: {
      '/api': 'http://localhost:8080/'
    },
    hot: true,
    hotOnly: true // 不会自动刷新页面,去掉此项后，文件变动会导致刷新页面
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // 识别不了字体文件
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 使@import导入的scss模块也能使用sass和postcss模块
              modules: true // 开启css模块化,这样子，在哪个模块里导入css，css则对某个模块起作用，不会影响全局
            }
          },
          'sass-loader',
          'postcss-loader' // postcss可以设置css浏览器厂商前缀
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 识别不了字体文件
          'css-loader',
          'postcss-loader' // postcss可以设置css浏览器厂商前缀
        ]
      }
    ]
  },
  plugins: [
    // 支持模块热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  // optimization: {
  //   usedExports: true // 开发模式下加这个可以开启Tree Shaking
  // },
  output: {
    filename: '[name]_[hash:8].js',// 入口文件都走该配置项
    chunkFilename: '[name].chunk.js'// 间接打包的文件走该配置
  }
}

module.exports = devConfig