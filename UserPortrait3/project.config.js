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
// const branch = fs.existsSync(path.join(__dirname, '.git')) ? fs.readFileSync(path.resolve(__dirname, '.git', 'HEAD'), 'utf-8').trim().split(': ')[1].split('/')[2] : 'master'
const { blue, red, gold } = require('@ant-design/colors')
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
    theme: {
        /**
         * Layout布局 
         */
        '@layout-body-background': '#101216', // body背景色
        '@layout-sider-background': '#161920', // side背景色
        '@layout-header-background': '#161920', // header背景色
        '@layout-trigger-color': 'fade(#fff, 80%)',
        '@layout-trigger-background': '#313232',
        /**
         * @End Layout布局 
         */
        
        /**
         * 背景色 
         */
        '@background-color-base': '#20232a',
        '@background-color-light': `fade(${blue[5]}, 40%)`,
        '@body-background': '#404041',   
        '@component-background': '#161920', // component背景色
        /**
         * @End 背景色 
         */
         
        /**
         * 菜单色
         */
        '@menu-dark-submenu-bg': '#fff',
        '@menu-bg': '@layout-header-background', // menu背景
        /**
         * @End 菜单色 
         */

         // 边框
        '@border-color-base': 'rgba(255, 255, 255, 0.25)',
        '@border-color-split': '#363636',

        /**
         * 所有表单控件颜色较背景色稍深一些 
         */ 
        '@input-bg': '#16181c', 
        '@input-number-handler-bg': '#16181c', 

        /**
         * checkbox 样式 
         */
        '@checkbox-border-width': '1px',
        '@checkbox-border-color': '#787A7E',
        /**
         * @End checkbox 样式 
         */

        /**
         * 表格 
         */
        '@table-selected-row-bg': '#3a3a3a',
        '@table-expanded-row-bg': '#3b3b3b',
        '@table-header-bg': '#3a3a3b',
        // 表格row背景hover样式
        '@table-row-hover-bg': '#1f232a',
        // 表格头部颜色
        '@table-header-bg': '#14171D',
        /**
         * @End 表格 
         */

        // 提示框
        '@alert-message-color': 'fade(#000, 67%)',
        '@item-hover-bg': `fade(${blue[5]}, 20%)`,
        '@item-active-bg': `fade(${blue[5]}, 40%)`,

        // 禁用颜色
        '@disabled-color': 'rgba(255, 255, 255, 0.25)',

        /**
         * 标签色
         */
        '@tag-default-bg': '#262628',
        /**
         * @End 标签色
         */

        /**
         * popover色
         */
        '@popover-bg': '#262629',
        /**
         * @End popover色
         */
        
        '@wait-icon-color': 'fade(#fff, 64%)',
        '@collapse-header-bg': '#262629',
        '@info-color': '#313133',
        '@highlight-color': red[7],
        '@warning-color': gold[9],
        
        // 全局主色
        '@primary-color': '#1B87ED',

        //按钮默认颜色
        '@btn-default-color': '#787A7E',

        // 输入框默认提示色
        '@input-placeholder-color': '#787A7E',

        /**
         * 文本颜色 
         */
        // 标题颜色
        '@heading-color': '#DBDCDE',
        // 标题颜色 加深
        '@heading-color-dark': '#FFFFFF',
        // 正文颜色
        '@text-color': '#AFB0B3',
        // 正文颜色 加深
        '@text-color-dark': 'fade(#FFFFFF, 85%)',
        // 正文颜色2
        '@text-color-secondary': 'fade(#F1F2F3, 70%)',
        // 正文颜色2 加深
        '@text-color-secondary-dark': 'fade(#FFFFFF, 65%)',
        /**
         * @End 文本颜色 
         */

        /**
         * Form 
         */
        '@label-required-color': '#DC283E',
        /**
         * @End Form 
         */

        /**
         * ToolTip 
         */
        '@tooltip-bg': '#20232a',
        '@tooltip-color': '#787A7E',

        /**
         * Select 
         */
        '@select-dropdown-bg': '#1c1e23',
        '@select-item-selected-bg': '#1c1e23',
        '@select-item-active-bg': '#24262c',

        /**
         * model 
         */
        // '@modal-header-bg': '#24262c',
        // '@modal-footer-bg': '#24262c'
        
        /**
         * Border color
         */
        '@border-color-base': 'rgba(241, 242, 243, 0.2)'
    },
    proxy,
    // global: { env: NODE_ENV, branch, ...globalEnv},
    global: { env: NODE_ENV, ...globalEnv},
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
    vendor: ['antd', 'react', 'react-dom', 'react-router-dom', 'react-loadable', 'mobx', 'mobx-react', 'crypto-js', 'js-cookie', 'axios','mockjs','moment','react-live-route','throttle-debounce','react-countup']
}
