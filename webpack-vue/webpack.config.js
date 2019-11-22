const path =require ('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin=require('html-webpack-plugin');
const webpack =require('webpack');
// const ExtractPlugin=require('extract-text-webpack-plugin');
// 在ｗｅｂｐａｃｋ升级到4.0之后extract-text-webpack-piugin这个插件就停止使用了

const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin=require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');

const isDev= process.env.NODE_ENV === 'development';

const config={
	target: "web",
	entry: path.join(__dirname,'src/main.js'),
	output: {
		filename:'[name].[hash:8].js',
		path: path.join(__dirname,'dist')
	},
	module:{ //配置加载资源
		rules: [
			{
				test: /\.vue$/,
				loader:'vue-loader'
			},
			{
				test: /\.jsx$/,
				loader:'babel-loader'
			},
			{
				test: /\.css$/,
				use:['style-loader','css-loader']
			},
			// css预处理器
			// {
			//     test:/\.styl/,
			//     use:['style-loader',
			//         'css-loader',
			//         {
			//           loader:'postcss-loader',
			//           options:{
			//               sourceMap:true,
			//           }
			//         },
			//         'stylus-loader'
			//     ]
			// },
			{
				test:/\.(gif|jpg|jpeg|png|svg)$/,
				use :[
					{
						loader: "url-loader",
						options:{
							limit:1024,
							name:'[name]-pir.[ext]'
						}
					}
				]
			}
		]
	},
	// webpack插件配置
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV: isDev? '"development"':'"production"'
			}
		}),
		new HTMLPlugin({
			title: "mytodo",
			filename:"index.html",
			favicon:''
		})
	]
};

if(isDev){
	config.module.rules.push(
		{
			test:/\.styl/,
			use:[
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
					}
				},
				'stylus-loader'
			]
		}
	);
	config.devtool='#cheap-module-eval-source-map';
	config.devServer={
		port:8000,
		host:'0.0.0.0',
		overlay:{
				error:true,
		},
		hot:true,
		// 自动刷新热加载
		// historyApiFallback
		open:true
	};
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
} else {
	config.output.filename='[name].[chunkhash:8].js';
	let extractLoader={
		loader:MiniCssExtractPlugin.loader,
		options:{}
	};
	config.module.rules.push(
		{
			test: /\.styl/,
			use: [
				extractLoader,
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
					}
				},
				'stylus-loader'
			]
		}
	);
	config.plugins.push(
		new MiniCssExtractPlugin({
			filename:"[name].[chunkhask:8].css"
		})
	);
	optimization={
		splitChunks:{
			chunk:'async',
			minSize:30000,
			maxAsyncRequests:5,
			maxInitialRequests:3,
			name:true,
			cacheGroup:{
				default:{
					priority:-20,
					reuseExistingChunk:true,
				},
				vendors:{
					name:'vendors',
					test:/[\\/]node_nomdles[\\/]/,
					priority: -10,
					chunks:"all"
				},
				echarts:{
					name:'echarts',
					chunks:'all',
					priority:20,
					test:function (module) {
						var context =module.context;
						return context&&(context.indexOf('echartd')>=0||context.indexOf('zrender')>=0)
					}
				}
			}
		},
		runtimeChunk:{name:"manifest"},
		minimizer:[
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSPlugin({})
		]
	}
}

module.exports=config;