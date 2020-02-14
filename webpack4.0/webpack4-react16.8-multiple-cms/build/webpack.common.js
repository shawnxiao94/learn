const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

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
  ];
  Object.keys(configs.entry).forEach(item => {
    plugins.push(
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
    index: './src/modules/Demo/main.js',
    // 如果有第二个页面则配置第二个入口
    // list: './src/list.js'
  },
  resolve: {
    extensions: [' ', '.js', '.jsx', '.json', '.vue', '.less', '.css'],    
    // 不写的话也是默认index
    mainFiles: ['index', 'main'],
    alias: {
      // 配置别名
      '@': path.resolve(__dirname, '../src'),
      'styles': resolve('src/assets/styles'),
    },
  },
  // cdn引入的资源不打包进buundle.js
  // externals : {
  //   react: 'react'
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [resolve('src')],
        use: ['happypack/loader?id=happyBabelLoader']
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
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          // 配置项
          options: {
            name: 'images/[name].[hash:7].[ext]', // 将图片都放入 images 文件夹下，[hash:7]防缓存
            limit: 10240
          }
        }
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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          // 配置项
          options: {
            name: '[name]-[hash:5].min.[ext]',
            // fonts file size <= 5kb,use 'base64';else output svg file
            limit: 5000,
            publicPath: 'fonts/',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  optimization: {
    sideEffects: false,
    runtimeChunk: {
      name: 'runtime'
    },
    usedExports: true,
    // 代码分割
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // 给打包文件取名,好像不起作用
          // filename: 'vendors.js',
          name: 'vendors', // 自定义打包后的文件名
        }
      }
    }
  },
  performance: false,
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },  
  output: {
    path: path.resolve(__dirname, '../dist'),
  }
};

// 插件
configs.plugins = makePlugins(configs);

module.exports = configs;
