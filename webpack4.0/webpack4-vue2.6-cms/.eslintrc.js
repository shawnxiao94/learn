module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": "standard",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
    "document": true,
    "localStorage": true,
    "window": true				
	},
	"parserOptions": {
		"parser": "babel-eslint",
 		//启用ES6语法支持(如果支持es6的全局变量{env: {es6: true}}，则默认启用ES6语法支持)
    //此处也可以使用年份命名的版本号：2015			
		"ecmaVersion": 6,
		"sourceType": "module"
	},
	"parser": "vue-eslint-parser",
	"plugins": [
		"vue",
		"html"
	],
	"rules": {
    // 重新覆盖 extends: 'standard'的规则
    // 自定义的规则,rules中的值0、1、2分别表示不开启检查、警告、错误。
    "linebreak-style": [0 ,"error", "windows"],
		"indent": ['error', 2], // error类型，缩进2个空格
		"no-param-reassign": ["error", {"props": false}], //禁止对 function 的参数进行重新赋值
    'space-before-function-paren': 1, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    'semi': ['error', 'always'], // 必须在语句后面加分号
    "quotes": [2, "double"], //双引号
    "no-console": 1,// 允许使用console.log()但会警告
		"no-debugger": 1, // 允许使用debugger但会警告
		"import/extensions": 0,    //取消对文件扩展名的验证
		"import/no-unresolved": 0,  //取消自动解析路径，以此开启alias的别名路径设置 
		"import/no-named-as-default": 0,    //使用导出名称作为默认导出标识符的报告
		"import/first": 0,                  //带变量名的必须放在头部		
    "no-irregular-whitespace": 2, //不规则的空白不允许
    "arrow-parens": 0,
		"no-new":0,//允许使用 new 关键字
		// 对webpack的配置文件的eslint进行放行配置
		"import/no-extraneous-dependencies": [2, {"devDependencies": true}],
		// 全局require引用不开启检查
		"global-require": 0,
		// 最多可以有1行空行
		"no-multiple-empty-lines": [2, {"max": 1, "maxEOF": 1}],
		// 末尾强制换行
		"eol-last": [2,"always"]	
	}
};