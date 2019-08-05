// 生成环境配置文件
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");
//抽离css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
				// 是样式文件时候 采用sass-loader编译，css-loader方案进行打包 用style-loader把样式挂载到页面上
				test: /\.scss$/i,
				// loader执行顺序是从下到上，从右到左
				use: [
					// MiniCssExtractPlugin.loader代替 style-loader使CSS文件单独打包出来
					MiniCssExtractPlugin.loader, 
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
			},{
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
  plugins: [
    new MiniCssExtractPlugin({
      //直接引用的css文件
      filename: "[name].css",
      //间接引用的css文件
      chunkFilename: "[id].css"
    })
  ]
})