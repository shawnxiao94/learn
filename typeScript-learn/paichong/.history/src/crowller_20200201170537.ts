/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-02-01 17:03:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

const fs = require('fs');
const path = require('path')
 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
const superagent = require('superagent');
import cheerio = require('cheerio');
import Dell

interface Course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: Course[]
}
interface Content {
  [propName: number]: Course[]; 
}

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
    // 首先拿到html信息
    const html = await this.getRawHtml()
    // 对字符串html进行分析
    // const courseInfo = this.getCourseInfo(html);
    // 再进行数据格式化
    // const fileContent = this.generateJsonContent(courseInfo)
    // 对格式化的数据写入文件
    this.writeFile()
  }

  constructor() {
    this.initSpiderProcess();
  }
}

const 
const crowller = new Crowller();