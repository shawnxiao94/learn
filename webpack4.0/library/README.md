```
### 库文件打包配置

外部引入库文件有如下几种方式：
// comonJS形式
1. import library from 'library'
// require形式
2. const library = require('library')
// AMD 形式
3.require(['library'], function(){

})
4.<script src="library.js"></script>

故此库文件打包得考虑配置兼容这几种方式
```

```
"license": "MIT" => package.json文件中配置这个意味着开源
"main": "./dist/library.js", => package.json文件中配置这个意味着开源此文件目录资源

命令 npm adduser => 添加NPM 上的账号密码
再执行 npm publish 命令则可以把项目库文件发布到NPM上,
别人npm install 路径 就可以使用了我们发布的库了。

```