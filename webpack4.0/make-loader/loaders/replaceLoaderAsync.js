const loaderUtils = require("loader-utils");

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  
  const callback = this.async();
  setTimeout(() => {
    // 异步loader编写
    const result = source.replace("dell", options.name);
    callback(null, result);
  }, 1000)
}