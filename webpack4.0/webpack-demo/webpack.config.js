const path = require('path');
// 生成HTML5文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 新版本下是这样引入，且下面应用的时候不需要传参配置，自动会在你设置的输出的目录清理下面的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require("webpack")

module.exports = {
	// 打包环境设置 production => 生成环境 development => 开发环境
	mode: 'development',
	// 开启错误调试,语法错误会提示在源代码哪个地方错误
	// 推荐cheap-module-eval-source-map设置，在开发环境提示的错误提示会比较全
	// 生产环境推荐 cheap-module-source-map
	// cheap 提示到行不提示到列的错误提示, module 代表不仅仅管业务代码也管模块loader的错误提示，eval代表以eval形式打包成一个JS文件而不额外生成映射文件
	devtool: 'cheap-module-eval-source-map',
	// 打包入口文件
	entry: {
		main: './src/index.js'
	},
	devServer: {
		// 哪个目录启动服务
		contentBase: './dist',
		// 启动npm start时自动打开浏览器访问服务
		open: true,
		// 端口号
		port: 8080,
		// 是否启动热更新
		hot: true,
		hotOnly: true,
		proxy: {
			// 跨域代理
			'/api': 'http://localhost:8080'
		}
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
			},
			{
				// 是样式文件时候 采用sass-loader编译，css-loader方案进行打包 用style-loader把样式挂载到页面上
				test: /\.scss$/i,
				// loader执行顺序是从下到上，从右到左
				use: [
					// 将 JS 字符串生成为 style 节点
					"style-loader", 
					// 将 CSS 转化成 CommonJS 模块
					{
						loader: 'css-loader',
						options: {
							// 在样式里如果嵌套引入了其他的样式文件时，继续引入下面的两个loader进行打包
							importLoaders: 2,
							// 设置后，可对样式进行分别作用
							modules: true
						}
					}, 
					// 将 Sass 编译成 CSS，默认使用 Node Sass
					"sass-loader", 
					// 对需要兼容处理的样式进行自动添加前缀
					{
						loader: "postcss-loader",
						options: {
							// 打包自动给样式添加浏览器兼容前缀 可以新建postcss.config.js里进行如下配置，也可以直接在下面配置也可以实现。
							plugins: [
								 //必须设置支持的浏览器才会自动添加前缀浏览器兼容
								require("autoprefixer")({
									browsers : ['last 100 versions']
								})
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		// 打包前会自动把输出目录下的文件全删除的插件
		new CleanWebpackPlugin(),
		// 打包结束后会自动生成HTML5文件,并把打包生成的JS自动引入到HTML中的插件
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		// 热更新
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		// 按需对引入方法或文件进行打包
		// tree shaking只支持 ES module
		usedExports: true,
		splitChunks: {
			chunks: "async",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: "~",
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					// cacheGroups重写继承配置，设为false不继承
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
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
		// 输出路径
		path: path.resolve(__dirname, 'dist')
	}
}