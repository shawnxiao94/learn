// 生成环境配置文件
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");

module.exports = merge(baseConfig, {
  // 待加入配置项
})