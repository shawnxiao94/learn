// 基础配置文件
const path = require("path");
// 生成HTML5文件的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 新版本下是这样引入，且下面应用的时候不需要传参配置，自动会在你设置的输出的目录清理下面的文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mergge = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const proConfig = require("./webpack.prod.js");

const commonConfig = {
  // 入口
  entry: {
    main: "./src/main.js",
    // 第二个入口文件
    // main2: './src/main2.js'
  },
  resolve: {
    // 先去找.js文件没有的话再找.jsx
    extensions: [".js", ".jsx"],
    // 配置别名
    alias: {
      "@components": path.resolve(__dirname, "../src/components"),
    },
  },
  // 打包方案配置
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // node_modules下的除外的JS 执行babel-loader进行ES6转es5
        // exclude: /node_modules/,
        // 或者直接指定执行babel-oader的目录
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 利用缓存，提高性能，babel is slow
            },
          },
          // webpack默认是this指向模块本身，通过这个loader可以改变this指向 this=>window 指向window
          {
            loader: "imports-loader?this=>window",
          },
          {
            // loader 执行顺序是自下而上，从右到左
            // 先执行eslint-loader检查代码规范再执行ES6转ES5
            loader: "eslint-loader",
            options: {
              // 自动修复问题
              fix: true,
            },
            // 指定检查的目录
            include: [path.resolve(__dirname, "src")],
          },
        ],
        // 根目录有了.babelrc.js文件的话这里就不需要再给options配置了
        // options: {
        //   // @babel/preset-env 执行es6转es5但在低版本浏览器下的语法不兼容,需要babel-polyfill来兼容,
        //   // babel-loader是执行与webpack之间的通信
        //   presets: [["@babel/preset-env"], {
        // 		targets: {
        // 			// 设置打包兼容到的最低版本，能兼容的ES6语法就不会执行转ES5
        //       edge: "17",
        //       firefox: "60",
        //       chrome: "67",
        //       safari: "11.1"
        // 		},
        //     // 设置按需转ES5以尽可能减少打包文件体积
        //     // 设置了此项 在业务逻辑页面就不要再不引入@babel/poryfill了
        // 		useBuiltIns: 'usage'
        // 	}]
        // }
      },
      {
        // 是图片文件时候 采用url-loader或file-loader 方案进行打包
        test: /\.(jpg|png|gif)$/i,
        use: {
          // url-loader未配置大小时时会直接把图片以base64打包进JS内，不管文件大小
          loader: "url-loader",
          // 配置项
          options: {
            // 配置打包后的文件名称和后缀 => placeholder 占位符
            name: "[name]_[hash].[ext]",
            // 输出路径
            outputPath: "images/",
            // 大小超过102400B即100kb打包成图片,小于的话打包成base64
            limit: 102400,
          },
        },
      },
      {
        // 是字体文件时 采用file-loader 方案进行打包
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: {
          loader: "file-loader",
          // 配置项
          options: {},
        },
      },
    ],
  },
  // 插件
  plugins: [
    // 打包前会自动把输出目录下的文件全删除的插件
    new CleanWebpackPlugin(),
    // 打包结束后会自动生成HTML5文件,并把打包生成的JS自动引入到HTML中的插件
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  optimization: {
    runtimeChunk: {
      // 旧版本webpack打包时，如果输出文件名有[contenthash]也无法实现 文件没修改就不改变hash,
      // 此时配置这个可以解决问题
      name: "runtime",
    },
    // 开启tree shaking过滤没用到的方法，tree shaking只支持 ES module,
    // production模式默认开启Tree Shaking,开发模式下Tree Shaking虽然生效，但是依然会引入没用到的代码，便于检查调试
    usedExports: true,
    // 代码分割
    splitChunks: {
      // 对异步还是同步代码进行分离打包,如果需要对同步代码进行分割则需要与cacheGroups:vendors一起搭配使用才有效果,
      // 'initial'是对同步代码进行分割, async为异步
      chunks: "all",
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
        // 一条规则对应一个打包组,vendors和default分别是一个组,
        // 符合匹配规则的代码块会打包到同一个组里
        vendors: {
          // 检测静态引入的依赖是否是这个目录下引入的,是则按这套规则打包
          test: /[\\/]node_modules[\\/]/,
          // 打包时如果引入的代码块满足多个组的匹配条件,则根据优先级，打包到优先级更高的组里
          priority: -10,
          // 给打包文件取名,好像不起作用
          // filename: 'vendors.js',
          name: "vendors", // 自定义打包文件名
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
  // 出口
  output: {
    // 设置打包输出文件的公共路径
    // 如果需要引入第三方（比如CDN）的地址，可以使用这个配置
    // publicPath: 'https://cdn.com',
    // 输出路径
    path: path.resolve(__dirname, "../dist"),
  },
};

module.exports = (env) => {
  if (env && env.production) {
    // 线上环境
    return mergge(commonConfig, proConfig);
  }
  // 开发环境
  return mergge(commonConfig, devConfig);
};
