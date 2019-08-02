/**
 * 终端运行时环境
 */
const cwd = process.cwd()

/**
 * express node.js服务端流行框架
 */
const express = require('express')

/**
 * webpack
 */
const webpack = require('webpack')

/**
 *  一个跨平台的node-open库，打开像网站、文件、可执行文件之类的功能
 *  eg:
 *  var opn = require('opn');
 *  opn('www.baidu.com'); // 使用默认浏览器打开网页
 *  opn('www.baidu.com',{app:'chrome'}); // 使用指定浏览器打开网页 chrome firefox
 */
// const opn = require('opn')

/**
 *  获取本机物理信息
 *  address.ip();   // '192.168.0.2'
 *  address.ipv6(); // 'fe80::7aca:39ff:feb0:e67d'
 *  address.mac(function (err, addr) {
        console.log(addr); // '78:ca:39:b0:e6:7d'
    });
 *  address.ip('lo'); // '127.0.0.1'
 *  address.mac('vboxnet', function (err, addr) {
        console.log(addr); // '0a:00:27:00:00:00'
    });
 */
// const address = require('address')

/**
 * 服务端热加载配置
 */
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

/**
 * 作用:压缩请求
 * see https://www.jianshu.com/p/95ea5e749af0
 */
const compress = require('compression')

/**
 * 网关代理
 */
const proxy = require('../lib/Proxy')

/**
 * 开发环境webpack配置
 */
const webpackConfig = require('../config/webpack.dev.config')

/**
 * 项目基本配置
 */
const project = require(`${cwd}/project.config`)

/**
 * 实例化配置文件
 */
const COMPILER = webpack(webpackConfig)

/**
 * 启动服务
 */
const APP = express()

/**
 * 服务端口
 */
const PORT = project.port

/**
 * 服务地址
 */
// const HOST = project.host

/**
 * 代理地址
 */
const PROXY_TABLE = project.proxy

/**
 * 压缩服务
 */
APP.use(compress())

/**
 * 开发环境服务基础配置
 */
const devMiddleware = webpackDevMiddleware(COMPILER, {
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'errors-only'
})
// devMiddleware.waitUntilValid(() => {
//     let host = ''
//     if (HOST === '0.0.0.0') {
//         try {
//             host = address.ip()
//         } catch (e) {
//             host = 'localhost'
//         }
//     } else {
//         host = HOST || 'localhost'
//     }

//     opn(`http://${host}:${PORT}`)
// })

/**
 * 热加载配置
 */
const hotMiddleware = webpackHotMiddleware(COMPILER, {
    path: '/__webpack_hmr',
    log: false
})

/**
 * 设置网关代理
 */
for (let x in PROXY_TABLE) {
    APP.use(new proxy(x, PROXY_TABLE[x]))
}

/**
 * 设置开发环境
 */
APP.use(devMiddleware)

/**
 * 设置热加载
 */
APP.use(hotMiddleware)

/**
 * 指定静态资源目录
 */
APP.use(express.static(project.basePath))

module.exports = {
    APP,
    PORT
}
