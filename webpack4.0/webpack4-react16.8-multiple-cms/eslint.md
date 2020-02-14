## eslint在webpack中的配置

#### 注意事项
1.使用`npx eslint --init`可以创建eslint配置文件

2.在devServer里加入`overlay:true`编辑后浏览器会自动弹出错误提示，无需打开控制台

3.npx eslint src 对src目录下的代码进行检查

### 针对react语言具体配置流程
```
1.使用`npx eslint --init`命令 执行初始化选择react语言依据提示会安装好eslint-plugin-react插件
2. 然后再安装eslint-config-airbnb，eslint-plugin-import eslint-plugin-jsx-a11y，babel-eslint插件及eslint-import-resolver-alias插件
3.我们使用的是airbnb公司的变态eslint规范，在.eslinttrc.js配置文件中我们"extends": "airbnb"这样设置采用airbnb公司的规范
4.globals里设置全局变量使eslint不报错
5.parserOptions里通过parser: "babel-eslint"配置指定babel-eslint为eslint解析器
6.在settings和rules里自定义重新覆盖 extends: 'airbnb'的规则
7.根目录新建.eslintignore文件配置指定文件或者文件夹不执行eslint规范校验
8.vscode编辑器选择'文件'=>'首选项'=>'设置' 打开'settings.json'文件配置"eslint.autoFixOnSave": true 可以保存文件时自动按照.eslintrc.js里配置的规范进行自动修复。注意，settings.json里的配置项的优先级低于.eslintrc.js里的配置
```
