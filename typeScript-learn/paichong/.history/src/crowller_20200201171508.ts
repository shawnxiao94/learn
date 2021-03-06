/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-02-01 17:15:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

const fs = require('fs');
const path = require('path')
 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
const superagent = require('superagent');

import DellAnalyzer from './dellAnalyzer'

class Crowller {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  private filePath = path.resolve(__dirname, '../data/course.json');

  
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  async initSpiderProcess() {
    // 爬虫流程 
    // 首先拿到html信息 => 对字符串html进行分析 => 再进行数据格式化 => 对格式化的数据写入文件   
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private analyzer: any) {
    this.initSpiderProcess();
  }
}

const analyzer = new DellAnalyzer()
const crowller = new Crowller(analyzer);