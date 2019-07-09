const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

// 去除多余CSS插件
const glob = require('glob-all')
const PurgecssPlugin = require('purgecss-webpack-plugin')

// 添加打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// 开启 gzip 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

// 是否是生产环境
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  //部署应用包时的基本 URL(解决build之后文件访问路径错误的问题)
  publicPath: './',
  // 'dist', 生产环境构建文件的目录
  outputDir: process.env.outputDir || 'dist',
  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: './static',
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/modules/Front/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要时 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Front Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/backend.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `backend.html`。
    backend: {
      entry: 'src/modules/Backend/main.js',
      // 模板来源
      template: 'public/backend.html',
      // 在 dist/index.html 的输出
      filename: 'backend.html',
      title: 'backend Page'
    }
  },
  // 防止将某些 import 的包(package)打包到 bundle 中，
  // 而是在运行时(runtime)再去从外部获取这些扩展依赖
  configureWebpack: config => {
    config.devtool = 'cheap-source-map'
    config.externals = {
      // cdn 版本的element-ui、vue、vue-router设置的全局变量分别是ELEMENT、Vue、VueRouter、axios、VueI18n
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      i18n: 'VueI18n'
    }
    if (IS_PROD) {
      const plugins = []
      // 去除多余无效的 css
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([resolve('./**/*.vue')]),
          extractors: [
            {
              extractor: class Extractor {
                static extract(content) {
                  const validSection = content.replace(
                    /<style([\s\S]*?)<\/style>+/gim,
                    ''
                  )
                  return validSection.match(/[A-Za-z0-9-_:/]+/g) || []
                }
              },
              extensions: ['html', 'vue']
            }
          ],
          whitelist: ['html', 'body'],
          whitelistPatterns: [/el-.*/],
          whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
        })
      )
      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('static', resolve('src/static'))
      .set('common', resolve('src/common'))
      .set('commonF', resolve('src/modules/Front/common'))
      .set('componentsF', resolve('src/modules/Front/components'))
      .set('dataF', resolve('src/modules/Front/data'))
      .set('pagesF', resolve('src/modules/Front/pages'))
      .set('routerF', resolve('src/modules/Front/router'))
      .set('commonB', resolve('src/modules/Backend/common'))
      .set('componentsB', resolve('src/modules/Backend/components'))
      .set('dataB', resolve('src/modules/Backend/data'))
      .set('pagesB', resolve('src/modules/Backend/pages'))
      .set('routerB', resolve('src/modules/Backend/router'))
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    // 链式配置
    config.module.rules.delete('svg') //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(resolve('src/assets/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  },
  // 配置 proxy 跨域
  devServer: {
    // 配置自动启动浏览器
    open: IS_PROD,
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  }
}
