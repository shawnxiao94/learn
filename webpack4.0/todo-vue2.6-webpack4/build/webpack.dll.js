/*
* @desc 静态公共资源打包配置
* 项目中引入了很多第三方库，这些库在很长的一段时间内，基本不会更新，打包的时候分开打包来提升打包速度，
* 而DllPlugin动态链接库插件，其原理就是把网页依赖的基础模块抽离出来打包到dll文件中，
* 当需要导入的模块存在于某个dll中时，这个模块不再被打包，而是去dll中获取。
*/
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    // 可以从vendors数组里提前出来单独打包
    vue: ["vue", "vuex", "vue-router"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dll"),
    // 用个全局变量把这些库暴露出去, 此处的全局变量名字就叫vendors
    library: "[name]_[hash]"
    // libraryTarget: 'this'
  },
  plugins: [
    new webpack.DllPlugin({
      // 对vendors这个库进行分析
      // 定义打包的公共vendor文件对外暴露的函数名
      name: "[name]_[hash]",
      // 把库的映射关系结果放这个文件里
      path: path.resolve(__dirname, "../dll/[name].manifest.json")
    })
  ]
};
