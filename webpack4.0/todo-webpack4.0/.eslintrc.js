module.exports = {
  // 作用的目录是根目录
  root: true,
  env: {
    browser: true, // 开发环境配置表示可以使用浏览器的方法
    node: true, //
    es6: true,
    amd: true
  },
  extends: [
    // 继承标准规则
    'airbnb',
  ],
  // 允许全局变量,将$设置为true，表示允许使用全局变量$
  globals: {
    "document": true,
    "localStorage": true,
    "window": true,
    "jQuery":true,
    $:true,    
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    // 按照模块的方式解析
    sourceType: 'module'
  },
  plugins: [
    'react',
  ],
  rules: {
    // 重新覆盖 extends: 'airbnb'的规则
    // 自定义的规则,rules中的值0、1、2分别表示不开启检查、警告、错误。
    "linebreak-style": [0 ,"error", "windows"],
    "indent": ['error', 2], // error类型，缩进2个空格
    'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    'semi': ['error', 'always'], // 必须在语句后面加分号
    "quotes": [2, "single"], //单引号
    "no-console": 1,// 允许使用console.log()但会警告
    "no-debugger": 1, // 允许使用debugger但会警告
    "no-irregular-whitespace": 0, //不规则的空白不允许
    "no-trailing-spaces": 1, //一行结束后面有空格就发出警告
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}], //不能有声明后未被使用的变量或参数
    "no-alert": 2, //禁止使用alert confirm prompt
    "no-lone-blocks": 0, //禁止不必要的嵌套块
    "no-class-assign": 2, //禁止给类赋值
    "no-cond-assign": 2, //禁止在条件表达式中使用赋值语句
    "no-const-assign": 2, //禁止修改const声明的变量
    "no-delete-var": 2, //不能对var声明的变量使用delete操作符
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复
    "no-duplicate-case": 2, //switch中的case标签不能重复
    "no-dupe-args": 2, //函数参数不能重复
    "no-empty": 2, //块语句中的内容不能为空
    "no-func-assign": 2, //禁止重复的函数声明
    "no-invalid-this": 0, //禁止无效的this，只能用在构造器，类，对象字面量
    "no-redeclare": 2, //禁止重复声明变量    
    "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
    "no-undef": 2, //不能有未定义的变量
    "camelcase": 0, //强制驼峰法命名
    "no-extra-boolean-cast": 0, //禁止不必要的bool转换
    "no-mixed-spaces-and-tabs": 0, //禁止混用tab和空格
    "arrow-parens": 0,
    "no-new":0//允许使用 new 关键字 
  }
};
