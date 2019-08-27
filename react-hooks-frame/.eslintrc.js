module.exports = {
  root: true,
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    'standard',
    'plugin:react/recommended'
  ],
  plugins: [
    "standard"
  ],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    },
    'react': {
      // 老外把version设置成999.999.999
      // 解决警告 Warning: React version not specified in eslint-plugin-react settings
      'version': 'detect'
    }
  },
  "rules": {
    "radix": 0,
    "global-require": 0,
    "import/no-dynamic-require": 0,
    "import/extensions": 0,
    "quotes": [1, "single"], //# 单引号
    "quote-props":[2, "as-needed"], //# 双引号自动变单引号
    "semi": [2, "never"], //# 一行结尾不要写分号
    // "comma-dangle": [1,"always-multiline"],//# 对象或数组多行写法时，最后一个值加逗号
    "no-unused-vars": 0 // 0 相当于 off，表示关闭规则，相当于不再校验这条规则：变量定义了必须使用
  },
  "globals": {
    // 如使用 window 对象，默认情况下会报 no-undef 的错误，需要在 .eslintrc 中进行相应配置。
    "window": true
  }
}