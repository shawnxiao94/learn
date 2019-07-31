const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core')

// 分析入口文件方法
const moduleAnalyser = (filename) => {
  // 读取到文件内容代码
  const content = fs.readFileSync(filename, 'utf-8');
  // 获取到抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  // 获取代码的依赖项路径
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({node}) {
      const dirname = path.dirname(filename);
      const newFile = './' + path.join(dirname, node.source.value);
      // 存取依赖项绝对路径和相对路径
      dependencies[node.source.value] = newFile;
    }
  })
  // 编译 => 把抽象语法树中的代码转换成浏览器能运行的代码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  return {
    filename,
    dependencies,
    code
  }
}
// 依赖图谱
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry)
  const graphArray = [ entryModule ];
  // 动态递归循环
  for(let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    // 得到依赖路径
    const { dependencies } = item;
    // 如果有依赖路径 则继续进行遍历
    if( dependencies ) {
      for( let j in dependencies) {
        // 动态更新数组长度进行递归找出依赖项下的依赖项
        graphArray.push(moduleAnalyser(dependencies[j]));
      }
    }
  }
  const graph = {}
  // 对依赖谱图数组进行对象格式转换
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  });
  return graph
}
// 对依赖图谱代码进行ES6编译转换
const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  return `
    (function(graph){
      // 对浏览器不识别的require()进行构建
      function require(module) {
        // 构建localRequire方法
        function localRequire(relativePath) {
          // 转换得到真实的绝对路径依赖
          return require(graph[module].dependencies[relativePath])
        }
        // 构建exports
        var exports = {};
        (function(require, exports, code){
          eval(code)
        })(localRequire, exports, graph[module].code);
        return exports;
      };
      require('${entry}')
    })(${graph});   
  `;
}
const code = generateCode('./src/index.js')
console.log(code)
