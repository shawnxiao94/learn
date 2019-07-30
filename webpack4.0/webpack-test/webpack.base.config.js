// 基础配置文件

const path = require("path");

module.exports = {
  // 待加入配置项
  mode: "development",
  entry: {
    merge1:"test1.js",
    merge2:"test2.js",
    merge3:"test3.js"
  },
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "[name].js"
  }
}