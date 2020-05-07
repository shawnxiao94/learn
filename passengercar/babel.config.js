const plugins = []
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
  // 生产环境去除console.log
  plugins.push('transform-remove-console')
}

module.exports = {
  //  IE 兼容配置
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins: plugins
}
