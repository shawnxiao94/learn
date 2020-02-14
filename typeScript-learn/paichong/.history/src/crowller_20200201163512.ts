/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-02-01 16:34:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
import superagent = require('superagent');
import cheerio = require('cheerio');

interface Course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: Course[]
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

  }
  
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(html);
    this.generateJsonContent(courseInfo)
  }

  constructor() {
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();