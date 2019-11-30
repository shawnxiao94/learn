const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
    // 可以从vendors数组里提前出来单独打包
    react: ['react', 'react-dom'],
    // 配置完后打包第一次后，下次就不需要再打包这些第三方模块
		// vendors: ['lodash'],
		// jquery: ['jquery']
	},
	output: {
		filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    // 用个全局变量把这些库暴露出去, 此处的全局变量名字就叫vendors
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
      // 对vendors这个库进行分析
      name: '[name]',
      // 把库的映射关系结果放这个文件里
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}