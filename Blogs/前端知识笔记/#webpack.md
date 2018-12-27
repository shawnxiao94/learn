### 什么是webpack
```
#打包：
可以把多个Javascript文件打包成一个文件，减少服务器压力和下载带宽。
#转换：
把拓展语言转换成为普通的JavaScript，让浏览器顺利运行。
#优化：
前端变的越来越复杂后，性能也会遇到问题，
而WebPack也开始肩负起了优化和提升性能的责任。
```


### webpack.conf.js
```
const path = require('path')

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
    filename: '[name].js'
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
      }
    ]
  },
  // 插件，用于生产模块和各项功能
  plugins:[

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
```