const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // 打包的过程中如遇到lodash库则忽略不打包进文件
  externals: 'lodash',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    // 如此配置会在全局变量添加这个变量，这样可以通过script方式直接引入使用打包的文件
    library: 'library',
    // 不管AMD,COMMONJS，CMD引入方式都可以
    libraryTarget: 'umd' // 设置this或window则library会变量挂载注入到this或者window中
  }
}