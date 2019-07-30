const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  // 配置loader全局变量
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [{
      test: /\.js/,
      use: [
        {
          // loader: path.resolve(__dirname, "./loaders/replaceLoader.js")
          loader: "replaceLoader"
        },
        {
          // loader: path.resolve(__dirname, "./loaders/replaceLoaderAsync.js"),
          loader: "replaceLoaderAsync",
          options: {
            name: "lee"
          }
        }
      ]
    }]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
}