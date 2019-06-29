const plugins = []
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
  // 生产环境去除console.log
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins: plugins
}
