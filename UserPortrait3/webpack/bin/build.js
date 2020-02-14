/**
 * 终端运行时环境
 */
const cwd = process.cwd()

/**
 * webpack
 */
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
 * 引入webpack生产环境配置
 */
const config = require('../config/webpack.pro.config')

/**
 * 引入项目配置文件
 */
const project = require(`${cwd}/project.config`)

/**
 * 输出文件路径
 */
const OUT_DIR = project.outDir

/**
 * 删除输出文件路径下的所有文件，并实例化webpack配置
 */
rimraf(OUT_DIR, err => {
  // 如果报错则抛出错误信息
  if (err) throw err
  // 实例化webpack配置
  webpack(config).run((err, stats) => {
    // 如果出错则抛出红色醒目提示信息
    if (err || stats.hasErrors()) {
      console.log(err || stats.compilation.errors)
      console.log(chalk.red('\n  Webpack compilation failed\n'))
    } else {
      /**
       * 打包成功后打印出输出结果
       * process.stdout属性返回一个对象，表示标准输出，同console.log。
       * see https://stackoverflow.com/questions/4976466/difference-between-process-stdout-write-and-console-log-in-node-js
       */
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        timings: false
      }) + '\n\n')
      // 提示打包成功完成
      console.log(`Webpack compiled successfully\n`)
    }
  })
})
