const path = require('path');
const fs = require('fs');
// 生成HTML5文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 新版本下是这样引入，且下面应用的时候不需要传参配置，自动会在你设置的输出的目录清理下面的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 将JavaScript或者CSS资产添加到 HTML web pack插件生成的HTML中的插件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
// 引入 多进程插件 happypack
const HappyPack = require('happypack');
const os = require('os');
// cpu几核就执行多少进程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// 创建 happypack 共享进程池，其中包含 6 个子进程
// const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const makePlugins = (configs) => {
  const plugins = [
    // 打包前会自动把输出目录下的文件全删除的插件
    new CleanWebpackPlugin(),
    new HappyPack({
      /*
        * 必须配置项
        */
      // id 标识符，要和 rules 中指定的 id 对应起来
      id: 'happyBabelLoader',
      // 需要使用的 loader，用法和 rules 中 Loader 配置一样
      // 可以直接是字符串，也可以是对象形式
      loaders: [
        'babel-loader',
        // {
        //   loader: 'eslint-loader',
        //   include: [path.resolve(__dirname, 'src')] // 指定检查的目录
        // }
      ],
      // 共享进程池threadPool: HappyThreadPool 代表共享进程池，
      // 即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      // 允许 HappyPack 输出日志
      verbose: true,
    }),
    // 让 moment.js 中的语言文件，按需加载。使用的时候配置即可。没有导入的语言文件不会被加载。
    // 默认情况下，加载moment.js会导入全部的语言文件。
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),    
  ];
  // 如果有多个入口文件则遍历通过HtmlWebpackPlugin插件把打包生成的JS插入到HTML中
  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      // 打包结束后会自动生成HTML5文件,并把打包生成的JS自动引入到HTML中的插件
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item],
        minify: {
          // 移除HTML中的注释
          removeComments: true,
          // 折叠空白区域 也就是压缩代码
          collapseWhitespace: true,
          // 去除属性引用
          removeAttributeQuotes: true,
        },
      }),
    );
  });
  // 读取mainifest文件中的映射文件动态链接
  const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
  files.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file),
      }));
    }
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file),
      }));
    }
  });
  return plugins;
};

const configs = {
  entry: {
    index: './src/main.js',
    // 如果有第二个页面则配置第二个入口
    // list: './src/list.js'
  },
  resolve: {
    // 会先查询.js的存在与否,再查找.jsx
    //导入的时候不用写拓展名
    extensions: [' ', '.js', '.jsx', '.json', '.vue', '.scss', '.css'],    
    // 不写的话也是默认index
    mainFiles: ['index', 'child'],
    alias: {
      // 配置别名
      '@': path.resolve(__dirname, '../src'),
      'styles': resolve('src/assets/styles'),
    },
  },
  module: {
    rules: [
      {
        // 问号表示x可有可无
        test: /\.jsx?$/,
        // node_modules下的除外的JS 执行babel-loader进行ES6转es5
        // exclude: /node_modules/,
        // 或者include直接指定执行babel-oader的目录
        include: path.resolve(__dirname, '../src'),
        // 之前单进程是使用这种方式直接使用loader
        // use: [
        // 解析es6转成es5
        // {
        //   loader: 'babel-loader'
        // },
        // webpack默认是this指向模块本身，通过这个loader可以改变this指向 this=>window 指向window
        // {
        // loader: 'imports-loader?this=>window',
        // }
        // ]
        // 现在多进程则用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
        // 把对.js or .jsx 的文件处理交给id为happyBabelLoader 的HappyPack 的实例执行
        use: ['happypack/loader?id=happyBabelLoader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/icons')],
        options: {
          symbolId: 'icon-[name]'//去掉svg这个图片加载不出来
        }
      },      
      {
        // 是图片文件时候 采用url-loader或file-loader 方案进行打包
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          // url-loader未配置大小时时会直接把图片以base64打包进JS内，不管文件大小
          loader: 'url-loader',
          exclude: [resolve('src/assets/icons')], //这个不处理svg图片，因为我们独立拆开让svg-sprite-loader来处理了
          // 配置项
          options: {
            // 配置打包后的文件名称和后缀 => placeholder 占位符
            name: 'images/[name].[hash:7].[ext]', // 将图片都放入 images 文件夹下，[hash:7]防缓存
            // 大小超过10240B即10kb打包成图片,小于的话打包成base64
            limit: 10240,
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]' // 媒体文件放入 media 文件夹下
        }
      },      
      {
        // 是字体文件时 采用file-loader 方案进行打包
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          // 配置项
          options: {
            name: '[name]-[hash:5].min.[ext]',
            // fonts file size <= 5kb,use 'base64';else output svg file
            limit: 5000,
            publicPath: 'fonts/',
            outputPath: 'fonts/',
          },
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      // 旧版本webpack打包时，如果输出文件名有[contenthash]也无法实现 文件没修改就不改变hash,
      // 此时配置这个可以解决问题
      // 兼容老版本webpack4，把manifest打包到runtime里，不影响业务代码和第三方模块
      name: 'runtime',
    },
    // 开启tree shaking过滤没用到的方法，tree shaking只支持 ES module,
    // production模式默认开启Tree Shaking,开发模式下Tree Shaking虽然生效，但是依然会引入没用到的代码，便于检查调试
    usedExports: true,
    // 代码分割
    splitChunks: {
      // 对异步还是同步代码进行分离打包,如果需要对同步代码进行分割则需要与cacheGroups:vendors一起搭配使用才有效果,
      // 'initial'是对同步代码进行分割, async为异步
      chunks: 'all',
      // 大于30kb才进行代码分割
      // minSize: 30000,
      // maxSize: 0, // 打包后的文件大小如果大于这个值,则进行二次打包
      // 比如两个以上的文件都用了lodash库里的方法，那就会进行代码分割
      // minChunks: 2,
      // 分离打包后若产生了5个文件，则之后的导入不再进行代码分割了
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: "~",
      // name: true,
      cacheGroups: {
        // 抽离第三方插件,一条规则对应一个打包组,vendors和default分别是一个组,
        // 符合匹配规则的代码块会打包到同一个组里
        vendors: {
          // 检测静态引入的依赖是否是这个目录下引入的,是则按这套规则打包
          test: /[\\/]node_modules[\\/]/,
          // 打包时如果引入的代码块满足多个组的匹配条件,则根据优先级，打包到优先级更高的组里
          priority: -10,
          // 给打包文件取名,好像不起作用
          // filename: 'vendors.js',
          name: 'vendors', // 自定义打包后的文件名
        },
        // default: {
        // 	// cacheGroups重写继承配置，设为false不继承
        // 	minChunks: 2,
        // 	priority: -20,
        // 	// 发现重复的模块则不进行打包
        // 	reuseExistingChunk: true,
        // 	filename: 'common.js'
        // }
      },
    },
  },
  // 引入第三方库文件过大时编辑器控制台会报出黄色警告,
  // 这个配置可以关闭性能提示
  performance: false,
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },  
  output: {
    // publicPath: 'https://lib.baomitu.com',  // 如何需要引入js 的cdn地址可以使用这个配置
    // filename: '[name]_[hash:8].js',// 入口文件都走该配置项
    // chunkFilename: '[name].chunk.js',// 间接打包的文件走该配置
    path: path.resolve(__dirname, '../dist'),
  }
};

// 插件
configs.plugins = makePlugins(configs);

module.exports = configs;
