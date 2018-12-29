const path = require('path')
const htmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口文件的配置项
  entry:{
    demo: './src/demo.js',
    demo2: './src/demo2.js'
  },
  // 出口文件的配置项
  output:{
    // 打包的路径
    path: path.resolve(__dirname,'dist'),
    // 打包后的文件名称
    // [name]的意思是根据入口文件的名称，
    // 打包成相同的名称，有几个入口文件，就可以打包出几个文件。
    filename: '[name]-[chunkhash].js'
  },
  // 模块：例如解读CSS，图片如何转换，压缩
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      // use 或者 loader  写法都可以
      {
        test: /\.styl$/,
        loader: [ 'style-loader', 'css-loader','stylus-loader' ]
      },
      {
        // url-loader封装内置了file-loader
        test:/\.(png|jpg|gif)/ ,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:500000
            }
          }
        ]
      }
    ]
  },
  // 插件，用于生产模块和各项功能
  plugins:[
    new htmlWebPackPlugin({
      template: 'index.html'
    })
  ],
  // 配置WEBPACK开发服务功能
  devServer:{
    //设置基本目录结构
    contentBase:path.resolve(__dirname,'dist'),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host:'localhost',
    //服务端压缩是否开启
    compress:true,
    //配置服务端口号
    port:1717
  }
}