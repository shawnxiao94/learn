class CopyrightWebpackPlugin {
  // constructor (options) {
  //   console.log(options)
  // }

  apply (compiler) {

    // 同步时刻
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', () => {
      console.log('compile')
    })

    // 异步时刻
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
      debugger
      compilation.assets['copyright.txt'] = {
        source: function () {
          return 'copyright by dell lee'
        },
        size: function () {
          return 21
        }
      }
      callback()
    })
  }
}

module.exports = CopyrightWebpackPlugin;