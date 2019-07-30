const loaderUtils = require("loader-utils");

module.exports = function (source) {
  // const options = loaderUtils.getOptions(this);
  
  // const callback = this.async();
 // 同步loader编写， 异步loader对dll 替换成lee后再通过同步loader替换成world
 return source.replace("lee", "world");
  // this.callback(null, result) // 等价 return source.replace("dell", options.name)
}