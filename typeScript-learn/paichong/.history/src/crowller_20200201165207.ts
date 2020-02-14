/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-02-01 16:52:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

const fs = require('fs');
const path = require('path')
 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
const superagent = require('superagent');
import cheerio = require('cheerio');

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
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = []
    courseItems.map((index,element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1],10)
      courseInfos.push({title, count})
    })
    return {
      time: (new Date()).getTime(),
      data: courseInfos
    }
  }
  
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  generateJsonContent(courseInfo: CourseResult){
    const filePath = path.resolve(__dirname, '../data/course.json');
    let fileContent: Content = {}
    if(fs.existsSync(filePath)) {
      // 如果文件存在
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent
  }
  
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo)
    this.generateJsonContent(courseInfo)
  }

  constructor() {
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();