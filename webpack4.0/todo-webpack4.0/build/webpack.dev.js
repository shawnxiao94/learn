const webpack = require('webpack')

const devConfig = {
  // 开发模式默认开启sourceMap
  mode: 'development',
  // 设置为none可以关闭sourcemap,
  // 开启错误调试,语法错误会提示在源代码哪个地方错误
  // 推荐cheap-module-eval-source-map设置，在开发环境提示的错误提示会比较全
  // 生产环境推荐 cheap-module-source-map
  // cheap 提示到行不提示到列的错误提示, module 代表不仅仅管业务代码也管模块loader的错误提示，
  // eval代表以eval形式打包成一个JS文件而不额外生成映射文件
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 使得路由跳转成功。当它发现地址栏的地址不是后台资源时则返回我们的html
    historyApiFallback: true,
    // 设置后浏览器会自动弹出错误提示
    overlay: true,
    // 监听的文件,哪个目录启动服务
    contentBase: './dist',
    // 启动webpack-dev-server时启动npm start时自动打开浏览器
    open: true,
    // 端口号
    port: 8080,
    // proxy: [{
    //   context: ["/auth", "/api"], // 代理多个目标
    //   target: "http://localhost:3000",
    // }],
    proxy: {
      // index: '', // 对根目录设置代理时需要将这个配置为''
      '/react/api': {
        target: 'http://www.dell-lee.com',
        pathRewrite: {
          'header.json': 'demo.json',
        },
        // 突破网站对爬虫的限制, 一般都要开启
        changeOrigin: true,
        // 请求https要加这个
        // secure: false,
        //  // 请求拦截
        // bypass: function(req, res, proxyOptions) {
        //  // 如果请求的是html,则跳过代理并返回html
        //  if(req.headers.accept.indexOf('html') !== -1) {
        //    console.log('skipping proxy for browser request')
        //    return '/index.html'
        //  }
        // },

      },
    },
    // 是否启动热更新
    hot: true,
    // 不会自动刷新页面,去掉此项后，文件变动会导致刷新页面
    hotOnly: true,
  },
  module: {
    rules: [
      {
        // 是样式文件时候 采用sass-loader编译，css-loader方案进行打包
        // 用style-loader把样式挂载到页面上
        test: /\.scss$/,
        // loader执行顺序是从下到上，从右到左
        use: [
          // 将 JS 字符串生成为 style 节点,识别不了字体文件
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 使@import导入的scss模块也能使用sass和postcss模块
              // 在样式里如果嵌套引入了其他的样式文件时，继续引入下面的两个loader进行打包
              importLoaders: 2,
              // 开启css模块化,这样子，在哪个模块里导入css，css则对某个模块起作用，不会影响全局,可对样式进行分别作用
              modules: true,
            },
          },
          // 将 Sass 编译成 CSS，默认使用 Node Sass
          'sass-loader',
          // postcss可以设置css浏览器厂商前缀
          {
            loader: 'postcss-loader',
            // 根目录有了postcss.config.js文件的话这里就不需要再给options配置了
            // options: {
            // 	// 打包自动给样式添加浏览器兼容前缀 可以新建postcss.config.js里进行如下配置，也可以直接在下面配置也可以实现。
            // 	plugins: [
            // 		 //必须设置支持的浏览器才会自动添加前缀浏览器兼容
            // 		require("autoprefixer")({
            // 			browsers : ['last 100 versions']
            // 		})
            // 	]
            // }
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 识别不了字体文件
          'style-loader',
          'css-loader',
          // postcss可以设置css浏览器厂商前缀
          'postcss-loader',
        ],
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
}

module.exports = devConfig