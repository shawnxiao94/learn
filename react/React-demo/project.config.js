/**
 * 项目配置文件
 * html     ：在 index.html 中，使用 <%= htmlWebpackPlugin.options.xxx %> 来访问 html 中的属性，可扩展
 * theme    ：主题配置
 * global   ：全局变量，使用时前加“process.env.”，字母变大写，例如 process.env.ENV 前缀，可扩展
 * branch   ：所在分支，可用于打包时判断（测试/线上）环境，等等
 * proxy    ：本地代理，请在 proxy.config.js 中配置你需要代理的地址
 * env      ：环境变量，开发环境为 development，生产环境为 production
 * relative : 相对路径，开启时，publicPath 将变为 './'，dist 目录下所有文件在同一层级，可直接访问 index.html
 * vendor   ：用于生成 dll 包，当 (dll不存在) (vendor被改变) (包的版本被更换) 时，请 npm run dll
 * 兼容IE的办法：
 * 将 mobx 的版本降至 v4.9.2。IE9 不支持 transition 和 animation，因此动画会失效。不支持 IE8 及以下版本。
 */
const NODE_ENV = process.env.NODE_ENV || 'development'
const fs = require('fs')
const path = require('path')
const proxy = require('./proxy.config')
const branch = fs.existsSync(path.join(__dirname, '.git')) ? fs.readFileSync(path.resolve(__dirname, '.git', 'HEAD'), 'utf-8').trim().split(': ')[1].split('/')[2] : 'master'
/**
 * 开发环境配置
 */
const developmentEnv = {
    LOGIN_HOST: 'http://casserver.njdev.datago.vip',
    LOGOUT_HOST: 'http://openapi2c.njdev.datago.vip',
    API_HOST: 'http://openapi2c.njdev.datago.vip/services',
    ROLE_CENTER: 'http://openapi2c.njdev.datago.vip/services',
    UPLOAD_FILE: 'http://openapi2c.njdev.datago.vip',
}
/**
 * 测试环境配置
 */
const testEnv = {
    LOGIN_HOST: 'http://casserver.njtest.datago.vip',
    LOGOUT_HOST: 'http://openapi2c.njtest.datago.vip',
    API_HOST: 'http://openapi2c.njtest.datago.vip/services',
    ROLE_CENTER: 'http://openapi2c.njtest.datago.vip/services',
    UPLOAD_FILE: 'http://openapi2c.njtest.datago.vip',
}
/**
 * 线上环境配置
 */
const productionEnv = {
    LOGIN_HOST: 'https://casserver.saicdt.com',
    LOGOUT_HOST: 'https://openapi2c.saicdt.com',
    API_HOST: 'https://openapi2c.saicdt.com/services',
    ROLE_CENTER: 'https://openapi2c.saicdt.com/services',
    UPLOAD_FILE: 'https://openapi2c.saicdt.com',
}
const globalEnv = process.env.RUN_NAME === 'development'?developmentEnv:process.env.RUN_NAME === 'test'?testEnv:productionEnv
module.exports = {
    html: {
        title: 'RS-ADMIN-CLI',
        fav: 'https://jines-z.github.io/images/favicon.ico'
    },
    /**
     * ant design 全局色系，可在theme里自定义覆盖全局颜色
        @primary-color: #1890ff; // 全局主色
        @link-color: #1890ff; // 链接色
        @success-color: #52c41a; // 成功色
        @warning-color: #faad14; // 警告色
        @error-color: #f5222d; // 错误色
        @font-size-base: 14px; // 主字号
        @heading-color: rgba(0, 0, 0, 0.85); // 标题色
        @text-color: rgba(0, 0, 0, 0.65); // 主文本色
        @text-color-secondary : rgba(0, 0, 0, .45); // 次文本色
        @disabled-color : rgba(0, 0, 0, .25); // 失效色
        @border-radius-base: 4px; // 组件/浮层圆角
        @border-color-base: #d9d9d9; // 边框色
        @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
     */
    theme: {},
    proxy,
    global: { env: NODE_ENV, branch, ...globalEnv},
    port: 8080,
    host: '0.0.0.0',
    env: NODE_ENV,
    basePath: __dirname,
    srcDir: path.resolve(__dirname, 'src'),
    outDir: path.resolve(__dirname, 'dist'),
    dllDir: path.resolve(__dirname, 'dll'),
    publicPath: NODE_ENV === 'development' ? './' : './',
    esLint: true,
    relative: false,
    vendor: ['antd', 'react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react', 'crypto-js', 'js-cookie', 'axios','mockjs','moment','react-live-route','throttle-debounce']
}
