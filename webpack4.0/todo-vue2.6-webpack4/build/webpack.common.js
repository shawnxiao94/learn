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
const { VueLoaderPlugin } = require('vue-loader')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const makePlugins = (configs) => {
  const plugins = [
    new CleanWebpackPlugin(),
    new HappyPack({
      id: 'happyBabelLoader',
      loaders: [
        'babel-loader',
      ],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/static'),
      to: './static',
      ignore: ['.*']
    }])    
  ];
  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
      }),
    );
  });
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
    extensions: ['.js', '.vue', '.json'], 
    mainFiles: ['index', 'main'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=happyBabelLoader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/icons')],
        options: {
          symbolId: 'icon-[name]',//去掉svg这个图片加载不出来
          outputPath: 'images/icons/',
        }
      },       
      {
        // 是图片文件时候 采用url-loader或file-loader 方案进行打包
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: {
          // url-loader未配置大小时时会直接把图片以base64打包进JS内，不管文件大小
          loader: 'url-loader',
          // 配置项
          options: {
            // 配置打包后的文件名称和后缀 => placeholder 占位符
            name: '[name]_[hash].[ext]',
            // 输出路径
            outputPath: 'images/',
            // 大小超过10240B即10kb打包成图片,小于的话打包成base64
            limit: 10240,
            // 启用CommonJS模块语法解决vue页面require()引入图片的问题
            esModule: false
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
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors', // 自定义打包后的文件名
        }
      }
    },
  },
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
};

// 插件
configs.plugins = makePlugins(configs);

module.exports = configs;
