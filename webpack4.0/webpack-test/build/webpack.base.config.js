// 基础配置文件
const path = require("path");
// 生成HTML5文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 新版本下是这样引入，且下面应用的时候不需要传参配置，自动会在你设置的输出的目录清理下面的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 打包入口文件
  entry: {
    main:"./src/index.js",
    test2: './src/test2.js'
  },
  	// 打包方案配置
	module: {
		rules: [
			{
				test: /\.js$/,
				// node_modules下的除外的JS 执行babel-loader进行ES6转es5
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					// @babel/preset-env 执行es6转es5但在低版本浏览器下的语法不兼容,需要babel-polyfill来兼容,
					//  babel-loader是执行与webpack之间的通信
					presets: [["@babel/preset-env"], {
						targets: {
							// 设置打包兼容到的最低版本，能兼容的ES6语法就不会执行转ES5
							chrome: "67"
						},
            // 设置按需转ES5以尽可能减少打包文件体积
            // 设置了此项 在业务逻辑页面可以不引入@babel/poryfill
						useBuiltIns: 'usage'
					}]
				}
			},
			{
				// 是图片文件时候 采用file-loader 方案进行打包
				test: /\.(jpg|png|gif)$/i,
				use: {
					// url-loader未配置大小时时会直接把图片以base64打包进JS内，不管文件大小
					loader: 'url-loader',
					// 配置项
					options: {
						// 配置打包后的文件名称和后缀 => placeholder 占位符
						name: '[name]_[hash].[ext]',
						// 输出路径
						outputPath: 'images/',
						limit: 102400
					}
				}
			},
			{
				// 是字体文件时 采用file-loader 方案进行打包
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: {
					loader: 'file-loader',
					// 配置项
					options: {}
				}
			}
		]
	},
  plugins: [
		// 打包前会自动把输出目录下的文件全删除的插件
		new CleanWebpackPlugin(),
		// 打包结束后会自动生成HTML5文件,并把打包生成的JS自动引入到HTML中的插件
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
  ],
	optimization: {
		// 按需对引入方法或文件进行打包
		// tree shaking只支持 ES module
		usedExports: true,
		// 代码分割
		splitChunks: {
			chunks: "async",
      minSize: 30000,
      // 比如两个以上的文件都用了lodash库里的方法，那就会进行代码分割
			minChunks: 2,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: "~",
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					filename: 'vendors.js'
				},
				default: {
					// cacheGroups重写继承配置，设为false不继承
					minChunks: 2,
					priority: -20,
					// 发现重复的模块则不进行打包
					reuseExistingChunk: true,
					filename: 'common.js'
				}
			}
		}
	},
	// 输入配置
	output: {
		// 设置打包输出文件的公共路径
		publicPath: './',
		// 输出名称,未配置的话默认是main.js，用占位符的话就可以使用设置的名字且支持多个打包文件命名
		filename: '[name]_[hash].js',
		// 在JS文件中间接引入的JS文件会打包成这种格式，这叫做chunk
		chunkFilename: '[name].chunk.js',
		// 输出路径
		path: path.resolve(__dirname, 'dist')
	}
}