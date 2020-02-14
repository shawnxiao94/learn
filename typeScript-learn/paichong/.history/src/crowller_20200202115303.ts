/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-02-02 11:53:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

const fs = require('fs');
const path = require('path')
 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
const superagent = require('superagent');

import DellAnalyzer from './dellAnalyzer'

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

// 组合设计模式；
// Crowller只负责读取url数据 存格式化好的数据，分析格式化数据等具体执行由第三方类去处理 
class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json');

  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    // 爬虫流程 
    // 首先拿到html信息 => 对字符串html进行分析 => 再进行数据格式化 => 对格式化的数据写入文件   
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}
const secret = 'secretKey'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
// const analyzer = new DellAnalyzer()
const analyzer = DellAnalyzer.getInstance(); // 单例模式，把类实例挂载在类属性上
new Crowller(url, analyzer);