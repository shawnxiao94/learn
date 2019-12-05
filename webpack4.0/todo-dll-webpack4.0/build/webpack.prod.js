const path = require('path');
const webpack = require('webpack');
// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，
// 支持按需加载css和sourceMap异步加载,不重复编译，性能好
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩单独的css文件插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
//静态资源输出插件
const copyWebpackPlugin = require("copy-webpack-plugin");
//消除冗余的css插件
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all')
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  // 设置为none可以关闭sourcemap
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, 
				{
					loader: 'css-loader',
					options: {
            // 使@import导入的scss模块也能使用sass和postcss模块
            // 在样式里如果嵌套引入了其他的样式文件时，继续引入下面的两个loader进行打包            
            importLoaders: 2,
            modules: true // 开启css模块化,这样子，在哪个模块里导入css，css则对某个模块起作用，不会影响全局
					}
				},
				'sass-loader',
				'postcss-loader'
			],
			include: path.resolve(__dirname, '../src')
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			],
			include: path.resolve(__dirname, '../src')
		}]
	},
	optimization: {
		// 压缩css
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
    //静态资源输出
    new copyWebpackPlugin([{
      // 打包的静态资源目录地址
      from: path.resolve(__dirname, "../src/static"),
      // 打包到dist下面的static
      to: './static',
      ignore: ['.*']
    }]),		
    // 消除未使用的CSS--生产环境---csstree-shaking
    new PurgecssPlugin ({
      //*.html 表示 src 文件夹下的所有 html 文件，还可以清除其它文件 *.js、*.php···
      //注意这里是 paths      
			paths: glob.sync([
				// 要做 CSS Tree Shaking 的路径文件
				path.resolve(__dirname, '..', 'src/*.html'),
				path.resolve(__dirname, '..', 'src/*.js'),
				path.resolve(__dirname, '..', 'src/**/*.jsx')
			])
		}), 
		new MiniCssExtractPlugin({
			filename: '[name].css', // 打包后的html里直接引用的css走这个配置
			chunkFilename: '[name].chunk.css'// 打包后的html里间接引用的css走这个配置
		}),		
    // 设置wpa离线缓存
    new WorkboxPlugin.GenerateSW({
      // Service Worker 被激活后使其立即获得页面控制权
      clientsClaim: true,
      // 强制等待中的 Service Worker 被激活
      skipWaiting: true,
    })				
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].chunk.js'
	}
}

module.exports = (env) => {
	let envList
	if(env && env.test) {
		envList = require('../config/test.env.js')
	} else {
		envList = require('../config/prod.env.js')
	}
	prodConfig.plugins.push(
		new webpack.DefinePlugin({
      'process.env.envList': envList
    })		
	)
	return merge(commonConfig, prodConfig)
}