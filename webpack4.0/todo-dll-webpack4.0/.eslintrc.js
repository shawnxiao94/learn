module.exports = {
	// 作用的目录是根目录
	root: true,
	// Environments，指定代码的运行环境。不同的运行环境，全局变量不一样，
	// 指明运行环境这样ESLint就能识别特定的全局变量。同时也会开启对应环境的语法支持，例如：es6
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	// 继承标准规则
	"extends": [
		"standard",
		"plugin:flowtype/recommended",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:vue/essential"
	],
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
		// "ecmaVersion": 2018,
		// 按照模块的方式解析
		"sourceType": "module"
	},
	"plugins": [
		// 使用eslint-plugin-html
		"html",
		"vue",
		"react",
		"flowtype"
	],
  "settings": {
		"flowtype": {
			// 只检查 声明 flow语法的文件
			"onlyFilesWithFlowAnnotation": true,
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
  },	
	"rules": {
    // 重新覆盖 extends: 'standard'的规则
		// 自定义的规则
		"react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "linebreak-style": [0 ,"error", "windows"],
    "indent": ['error', 2], // error类型，缩进4个空格
    'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    'semi': ['error', 'always'], // 必须在语句后面加分号
    "quotes": ["error", "double"],// 字符串没有使用单引号
    "no-console": ["error",{allow:["log","warn"]}],// 允许使用console.log()
    "arrow-parens": 0,
    "no-new":0//允许使用 new 关键字 		
	}
};