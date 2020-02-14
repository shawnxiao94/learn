/**
 * 终端运行时环境
 */
const cwd = process.cwd()
const webpack = require('webpack')

/**
 * webpack merge插件
 */
const merge = require('webpack-merge')

/**
 * webpack常规配置文件
 */
const base = require('./webpack.base.config')

/**
 * 主配置文件
 */
const project = require(`${cwd}/project.config`)

/**
 * 项目SRC目录
 */
const SRC_DIR = project.srcDir

/**
 * theme风格配置
 */
const THEME = project.theme

const utils = require('./utils')
let _entries = {}
Object.keys(utils.plugins.Entries).forEach(fileName => {
  _entries[fileName] = ['webpack-hot-middleware/client?path=./__webpack_hmr']
})
const development = {
  /**
   * 项目入口文件配置
   */
  entry: _entries,
  /**
   * 配置文件模式 开发环境
   */
  mode: 'development',

  /**
   * 打包方式
   */
  devtool: 'cheap-module-eval-source-map',

  /**
   * 打包方式
   */
  module: {
    rules: [
      /**
       * less样式编译包
       */
      {
        test: /(\.less|\.css)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            paths: [SRC_DIR],
            modifyVars: THEME
          }
        }]
      }
    ]
  },
  plugins: [
    /**
     * 引入热加载插件
     * NoEmitOnErrorsPlugin插件可以屏蔽报错信息输出
     */
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

/**
 * 合并常规配置和开发环境webpack配置
 */
module.exports = merge(base, development)
