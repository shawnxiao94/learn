/**
 * 终端运行时环境
 */
const cwd = process.cwd()

/**
 * 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * webpack 打包美化插件，可以显示打包进度条等
 */
const WebpackBar = require('webpackbar')

/**
 * webpack 拷贝插件
 * @param {String} from    定义要拷贝的源文件            from：__dirname+'/src/components'
 * @param {String} to      定义要拷贝到的目标文件夹       to: __dirname+'/dist'
 * @param {String} toType  file 或者 dir                可选，默认是文件
 * @param {String} force   强制覆盖前面的插件            可选，默认是文件
 * @param {String} context 可选，默认base context       可用 specific,context
 * @param {String} flatten 只拷贝指定的文件              可以用模糊匹配
 * @param {String} ignore  忽略拷贝指定的文件            可以模糊匹配
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * webpack merge插件
 */
const merge = require('webpack-merge')

/**
 * 当使用CSS呈现页面的关键路径时，使用精简的、结构良好的样式表文档就变得很重要。 换句话说，默认的浏览器网页渲染过程，直到样式表被加载，解析和执行完成后才停止。因此，如果CSS文档大而且杂乱，网站的加载时间就会很久。
 * cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
 */
const CssNaNo = require('cssnano')

/**
 * 根据对浏览器的兼容性要求可动态配置来编译支持配置浏览器标准的样式
 * see https://www.jianshu.com/p/71b8f1caef4e
 */
const PostCssPresetEnv = require('postcss-preset-env')

const path = require('path')

/**
 * webpack常规配置文件
 */
const base = require('./webpack.base.config')

/**
 * 主配置文件
 */
const project = require(`${cwd}/project.config`)

/**
 * 返回src根目录
 */
const SRC_DIR = project.srcDir

/**
 * 返回项目根目录
 */
const BASE_PATH = project.basePath

/**
 * theme风格配置
 */
const THEME = project.theme

/**
 * 相对路径，开启时，publicPath 将变为 './'，dist 目录下所有文件在同一层级，可直接访问 index.html
 */
const RELATIVE = project.relative

const production = {
    /**
     * 出口文件配置
     */
    output: {
        filename: `${RELATIVE ? '' : 'js/'}[name].[chunkhash:5].js`
    },

    /**
     * 配置文件模式 生产模式
     */
    mode: 'production',
    
    /**
     * 关闭调试工具
     */
    devtool: false,
    
    /**
     * 模块
     */
    module: {
        rules: [
            /**
             * 分离css样式文件
             */
            {
                test: /(\.less|\.css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                PostCssPresetEnv(),
                                CssNaNo({
                                    reduceIdents: false,
                                    autoprefixer: false
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            paths: [SRC_DIR],
                            modifyVars: THEME
                        }
                    }
                ]
            }
        ]
    },

    /**
     * 打包压缩分割
     * see https://segmentfault.com/a/1190000017066322?utm_source=tag-newest
     */
    optimization: {
        sideEffects: false,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        /**
         * webpack 打包美化插件，可以显示打包进度条等
         */
        new WebpackBar({
            minimal: false
        }),

        /**
         * 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
         */
        new MiniCssExtractPlugin({
            filename: `${RELATIVE ? '' : 'css/'}[name].[chunkhash:5].css`
        }),
        
        /**
         * webpack 拷贝插件
         */
        new CopyWebpackPlugin([{
            from: path.join(BASE_PATH, 'dll'),
            to: path.join(BASE_PATH, 'dist', 'dll')
        }])
    ]
}

/**
 * 合并常规配置和开发环境webpack配置
 */
module.exports = merge(base, production)
