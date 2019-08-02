/**
 * 终端运行时环境
 */
const cwd = process.cwd()

/**
 * webpack
 */
const webpack = require('webpack')

/**
 * path
 */
const path = require('path')

/**
 * HTML打包插件
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * HTML打包静态资源插件
 */
const IncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

/**
 * eslint错误信息打印在终端商
 */
const ESLintFormatter = require('eslint-friendly-formatter')

/**
 * 项目配置文件
 */
const project = require(`${cwd}/project.config`)

/**
 * babel配置文件
 */
const babelRC = require('../../babelrc')

/**
 * 环境变量 开发还是生产
 */
const ENV = project.env

/**
 * 全局变量
 * 全局变量，使用时前后加“__”，字母变大写，例如 __ENV__，可扩展
 * @default 'env','branch'
 */
const GLOBAL = project.global

/**
 * 是否开启Eslint
 */
const ESLINT = project.esLint

/**
 * 相对路径，开启时，publicPath 将变为 './'，dist 目录下所有文件在同一层级，可直接访问 index.html
 */
const RELATIVE = project.relative

/**
 * 返回src根目录
 */
const SRC_DIR = project.srcDir

/**
 * 返回dist根目录
 */
const OUT_DIR = project.outDir

/**
 * 返回项目根目录
 */
const BASE_PATH = project.basePath

/**
 * 项目描述
 * title: 项目标题,
 * fav: 项目ICO文件路径
 */
const HTML_OPTIONS = project.html

/**
 * 返回运行时根目录
 * NODE_ENV === 'development' ? './' : '',
 */
const PUBLIC_PATH = project.publicPath

/**
 * 声明字体类型
 */
const fonts = [
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml'],
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2']
]

/**
 *  Eslint 规则配置
 *  @return include 以项目根目录开始扫描
 *  @return exclude 排除node_modules目录
 *  @return enforce:'pre' enforce设置为pre可以让Webpack在使用babel编译之前运行eslint进行代码检查
 */
const ESLintRule = () => ({
    test: /(\.jsx|\.js)$/,
    use: {
        loader: 'eslint-loader?cacheDirectory',
        options: {
            formatter: ESLintFormatter
        }
    },
    enforce: 'pre',
    include: SRC_DIR,
    exclude: /node_modules/
})

/**
 *  主要配置
 */
const base = {
    /**
     * entry 导入目录
     */
    entry: {
        main: ['@babel/polyfill', SRC_DIR]
    },
    /**
     *  output 导出目录
     */
    output: {
        publicPath: RELATIVE ? './' : PUBLIC_PATH,
        path: OUT_DIR
    },
    /**
     *  resolve.alias 路径映射
     *  在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
     *  resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是
     *  resolve.modules  配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去  node_modules  目录下寻找。 有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样  import '../../../components/button'  这时你可以利用  modules  配置项优化，假如那些被大量导入的模块都在  ./src/components  目录下，把  modules  配置成
     */
    resolve: {
        alias: {
            '@': SRC_DIR
        },
        modules: [SRC_DIR, 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.less', '.css']
    },
    /**
     *  模块配置
     */
    module: {
        rules: [
            /**
             *  Eslint配置
             */
            ...(ESLINT ? [ESLintRule()] : []),
            
            /**
             *  babel-loader转译
             */
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
                    options: babelRC
                },
                include: SRC_DIR,
                exclude: /node_modules/
            },
            
            /**
             *  图片配置
             */
            {
                test: /\.(png|PNG|jpe?g|JPG|gif|GIF)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: `${RELATIVE ? '' : 'images/'}[name].[hash:5].[ext]`
                    }
                }
            },
            
            /**
             *  视频配置
             */
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: `${RELATIVE ? '' : 'media/'}[name].[hash:5].[ext]`
                    }
                }
            },
            
            /**
             *  字体库配置
             */
            ...(() => {
                let rules = []
                fonts.forEach(item => {
                    rules.push({
                        test: new RegExp(`\\.${item[0]}$`),
                        use: {
                            loader: 'url-loader',
                            options: {
                                name: `${RELATIVE ? '' : 'fonts/'}[name].[hash:5].[ext]`,
                                limit: 10000,
                                mimetype: item[1]
                            }
                        }
                    })
                })
                return rules
            })()
        ]
    },
            
    /**
     *  关闭控制台提示
     */
    performance: {
        hints: false
    },
            
    /**
     *  插件库
     */
    plugins: [
        /**
         *  设置全局变量
         *  将GLOBAL配置里的参数以__转大写变量输出
         */
        new webpack.DefinePlugin((() => {
            const obj = {}
            for (let x in GLOBAL) {
                obj[`process.env.${x.toUpperCase()}`] = JSON.stringify(GLOBAL[x])
            }
            console.log(obj)
            return obj
        })()),
        
        /**
         *  DLLPlugin 它能把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快。

         *  DLLPlugin 这个插件是在一个额外独立的webpack设置中创建一个只有dll的bundle，也就是说我们在项目根目录下除了有webpack.config.js，还会新建一个webpack.dll.config.js文件。webpack.dll.config.js作用是把所有的第三方库依赖打包到一个bundle的dll文件里面，还会生成一个名为 manifest.json文件。
         *  该manifest.json的作用是用来让 DllReferencePlugin 映射到相关的依赖上去的。

         *  DllReferencePlugin 这个插件是在webpack.config.js中使用的，该插件的作用是把刚刚在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来。什么意思呢？就是说在webpack.dll.config.js中打包后比如会生成 vendor.dll.js文件和vendor-manifest.json文件，vendor.dll.js文件包含所有的第三方库文件，vendor-manifest.json文件会包含所有库代码的一个索引，当在使用webpack.config.js文件打包DllReferencePlugin插件的时候，会使用该DllReferencePlugin插件读取vendor-manifest.json文件，看看是否有该第三方库。vendor-manifest.json文件就是有一个第三方库的一个映射而已。

         *  所以说 第一次使用 webpack.dll.config.js 文件会对第三方库打包，打包完成后就不会再打包它了，然后每次运行 webpack.config.js文件的时候，都会打包项目中本身的文件代码，当需要使用第三方依赖的时候，会使用 DllReferencePlugin插件去读取第三方依赖库。所以说它的打包速度会得到一个很大的提升。
         */
        new webpack.DllReferencePlugin({
            context: BASE_PATH,
            manifest: path.resolve(BASE_PATH, 'dll', 'manifest.json')
        }),
        
        /**
         * HTML插件
         * 使用minify会对生成的html文件进行压缩。默认是false。html-webpack-plugin内部集成了 html-minifier,因此，还可以对minify进行配置：（注意，虽然minify支持BooleanObject,但是不能直接这样写：minify: true , 这样会报错 ERROR in TypeError: Cannot use 'in' operator to search for 'html5' in true , 使用时候必须给定一个 { } 对象 ）
         * @see 'https://segmentfault.com/a/1190000013883242?utm_source=tag-newest'
         */
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: ENV === 'production',
                collapseWhitespace: ENV === 'production',
                removeAttributeQuotes: ENV === 'production'
            },
            ...HTML_OPTIONS
        }),
        
        /**
         *  打包静态资源
         */
        new IncludeAssetsPlugin({
            assets: [{
                path: 'dll',
                glob: '*.js',
                globPath: path.join(BASE_PATH, 'dll')
            }],
            append: false
        })
    ],
    
    /**
     * 外部插件映射
     * 引入Echarts
     */
    externals: {
        echarts: 'echarts'
    }
}

module.exports = base
