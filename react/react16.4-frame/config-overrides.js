const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override (config, env) {
  config.resolve.alias = {
    '@': resolve('src'),
    '@assets': resolve('src/assets'),
    '@pages': resolve('src/pages'),
    '@common': resolve('src/common'),
    '@data': resolve('src/data'),
    '@components': resolve('src/components'),
    '@router': resolve('src/router')
  }
  return config;
}