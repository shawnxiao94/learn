/**
 * 处理器
 */
const rules = function() {
  let loaders = []
  return loaders
}

/**
 * 终端运行时环境
 */
const cwd = process.cwd()

/**
 * 项目配置文件
 */
const project = require(`${cwd}/project.config`)

/**
 * 环境变量 开发还是生产
 */
const ENV = project.env
  
/**
 * 创建打包路径
 */
const createFiles = function() {
  const path = require('path')
  const glob = require('glob')
  const result = []
  const files = glob.sync(path.join(__dirname, `../../src/modules/**/*.html`))
  for (const file of files) {
    result.push({
      name: file.match(/\w{0,}(?=\.html)/)[0],
      templatePath: file,
      jsPath: file.replace('html', 'js'),
      stylePath: file.replace('html', 'less')
    })
  }
  return result
}
  
/**
 * 插件
 */
const plugins = function() {
  const files = createFiles()
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const HappyPack = require('happypack')
  let htmlPlugins = []
  let Entries = {}
  files.map(file => {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `${file.name}.html`,
        favicon: './favicon.ico',
        template: file.templatePath,
        chunks: [file.name],
        minify: {
          removeComments: ENV === 'production',
          collapseWhitespace: ENV === 'production',
          removeAttributeQuotes: ENV === 'production'
        }
      })
    )
    Entries[file.name] = ['@babel/polyfill', file.jsPath]
  })
  
  return {
    Plugins: [
      ...htmlPlugins,
      new HappyPack({
        id: 'happyBabel',
        threads: 4,
        loaders: [{
          loader: 'babel-loader?cacheDirectory=true'
        }]
      })
    ],
    Entries
  }
}
  
exports.rules = rules()
exports.plugins = plugins()
  