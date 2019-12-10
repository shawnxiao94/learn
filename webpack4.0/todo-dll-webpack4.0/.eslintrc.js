module.exports = {
	// 作用的目录是根目录
	root: true,	
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	// 使用airbnb公司的变态eslint规范
	"extends": "airbnb",
	// "parser": "babel-eslint",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
    "document": true,
    "localStorage": true,
    "window": true			
	},
	"parserOptions": {
		// 此项是用来指定eslint解析器的，解析器必须符合规则，
		// babel-eslint解析器是对babel解析器的包装使其与ESLint解析		
		parser: "babel-eslint",		
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		// 按照模块的方式解析
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
    // 重新覆盖 extends: 'airbnb'的规则
    // 自定义的规则,rules中的值0、1、2分别表示不开启检查、警告、错误。
		"react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "linebreak-style": [0 ,"error", "windows"],
    "indent": ['error', 2], // error类型，缩进2个空格
    'space-before-function-paren': 1, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    'semi': ['error', 'always'], // 必须在语句后面加分号
    "quotes": [2, "double"], //双引号
    "no-console": 1,// 允许使用console.log()但会警告
    "no-debugger": 1, // 允许使用debugger但会警告
    "no-irregular-whitespace": 2, //不规则的空白不允许
    "arrow-parens": 0,
		"no-new":0,//允许使用 new 关键字
		// 对JSX的规范警告进行放行
		"react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		// 对webpack的配置文件的eslint进行放行配置
		"import/no-extraneous-dependencies": [2, {"devDependencies": true}],
		// 全局require引用不开启检查
		"global-require": 0,
		// 最多可以有1行空行
		"no-multiple-empty-lines": [2, {"max": 1, "maxEOF": 1}],
		// 末尾强制换行
		"eol-last": 2
	},
	"settings": {
		// 解决webpack里面配置了别名和路径,而eslint没有适配这个规则导致的规范报错
    "import/resolver": {
			"alias": {
        "map": [
          ["@", "./src"]
        ],
        "extensions": [".js", ".jsx", ".json"]
      }
    },		
		"react": {
			"createClass": "createReactClass", // Regex for Component Factory to use,
																					// default to "createReactClass"
			"pragma": "React",  // Pragma to use, default to "React"
			"version": "detect", // React version. "detect" automatically picks the version you have installed.
													// You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
													// default to latest and warns if missing
													// It will default to "detect" in the future
			"flowVersion": "0.53" // Flow version
		},
		"propWrapperFunctions": [
			// The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
			"forbidExtraProps",
			{"property": "freeze", "object": "Object"},
			{"property": "myFavoriteWrapper"}
		],
		"linkComponents": [
			// Components used as alternatives to <a> for linking, eg. <Link to={ url } />
			"Hyperlink",
			{"name": "Link", "linkAttribute": "to"}
		]
	}    
};