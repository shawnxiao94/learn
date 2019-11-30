module.exports = {
  // webpack打包配置文件里配置了的话这里就不需要配了，自动给样式加上厂商前缀
  plugins: [
    require('autoprefixer')
  ]
}