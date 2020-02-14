/**
 * 终端运行时环境
 */
const cwd = process.cwd()
const webpack = require('webpack')

/**
 * chalk 这个包是为了使输出不再单调,添加文字背景什么的,改变字体颜色什么的
 * const chalk= require('chalk');
 * console.log(chalk.red('this is red!'));
 */
const chalk = require('chalk')

/**
 * rimraf 包的作用：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除.
 */
const rimraf = require('rimraf')

/**
 * 引入webpack DLL环境配置
 */
const config = require('../config/webpack.dll.config')

/**
 * 引入项目配置文件
 */
const project = require(`${cwd}/project.config`)

/**
 * DLL文件路径
 */
const DLL_DIR = project.dllDir

/**
 * 删除DLL文件内容，并实例化wepack配置
 */
rimraf(DLL_DIR, err => {
  if (err) throw err
  webpack(config).run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err || stats.compilation.errors)
      console.log(chalk.red('\n  Webpack compilation failed\n'))
    } else {
      console.log(chalk.green(`  Webpack compiled successfully\n`))
    }
  })
})

