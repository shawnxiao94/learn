/**
 * 终端运行时环境
 */
const cwd = process.cwd()
const webpack = require('webpack')

/**
 * webpack 打包美化插件，可以显示打包进度条等
 */
const WebpackBar = require('webpackbar')

const path = require('path')

/**
 * 项目配置文件
 */
const project = require(`${cwd}/project.config`)

/**
 * dll第三方插件配置项
 */
const VENDOR = project.vendor

/**
 * 返回项目根目录
 */
const BASE_PATH = project.basePath

/**
 * dll文件存放目录
 */
const DLL_DIR = project.dllDir

module.exports = {
  /**
   * 入口目录
   */
  entry: {
    vendor: VENDOR
  },

  /**
   * 配置文件模式
   */
  mode: 'production',

  /**
   * 出口目录
   */
  output: {
    path: DLL_DIR,
    filename: '[name].dll.[hash:5].js',
    library: '[name]_library'
  },
            
  /**
   *  关闭控制台提示
   */
  performance: {
    hints: false
  },
            
  /**
   *  引用插件
   */
  plugins: [
    /**
     * webpack 打包美化插件，可以显示打包进度条等
     */
    new WebpackBar({
      minimal: false,
      compiledIn: false
    }),
        
    /**
     *  DLLPlugin 它能把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快。

     *  DLLPlugin 这个插件是在一个额外独立的webpack设置中创建一个只有dll的bundle，也就是说我们在项目根目录下除了有webpack.config.js，还会新建一个webpack.dll.config.js文件。webpack.dll.config.js作用是把所有的第三方库依赖打包到一个bundle的dll文件里面，还会生成一个名为 manifest.json文件。
     *  该manifest.json的作用是用来让 DllReferencePlugin 映射到相关的依赖上去的。

     *  DllReferencePlugin 这个插件是在webpack.config.js中使用的，该插件的作用是把刚刚在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来。什么意思呢？就是说在webpack.dll.config.js中打包后比如会生成 vendor.dll.js文件和vendor-manifest.json文件，vendor.dll.js文件包含所有的第三方库文件，vendor-manifest.json文件会包含所有库代码的一个索引，当在使用webpack.config.js文件打包DllReferencePlugin插件的时候，会使用该DllReferencePlugin插件读取vendor-manifest.json文件，看看是否有该第三方库。vendor-manifest.json文件就是有一个第三方库的一个映射而已。

     *  所以说 第一次使用 webpack.dll.config.js 文件会对第三方库打包，打包完成后就不会再打包它了，然后每次运行 webpack.config.js文件的时候，都会打包项目中本身的文件代码，当需要使用第三方依赖的时候，会使用 DllReferencePlugin插件去读取第三方依赖库。所以说它的打包速度会得到一个很大的提升。
     */
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve(DLL_DIR, 'manifest.json'),
      context: BASE_PATH
    })
  ]
}
