// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，
// 支持按需加载css和sourceMap异步加载,不重复编译，性能好
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩单独的css文件插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css', // 打包后的html里直接引用的css走这个配置
			chunkFilename: '[name].chunk.css'// 打包后的html里间接引用的css走这个配置
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].chunk.js'
	}
}

module.exports = merge(commonConfig, prodConfig);