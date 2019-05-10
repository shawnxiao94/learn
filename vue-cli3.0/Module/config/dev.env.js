'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 认证登录跳转IP
  LoginHost: '"http://118.25.101.100:8080/cas"',
  LogoutHost: '"http://118.25.56.97:8080"',
  BaseUrl: '"http://118.25.56.97:8080/services"',
  RoleCenterUrl: '"http://111.231.78.114:8080/services"'
})
