module.exports = {
  // webpack打包配置文件里配置了的话这里就不需要配了，自动给样式加上厂商前缀
  plugins: [
    require("autoprefixer"),
    // px转换rem  需 install postcss-plugin-px2rem
    // require("postcss-plugin-px2rem")({'remUnit': 75,'baseDpr':2})
  ],
};
