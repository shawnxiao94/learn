/*
 * @Author: your name
 * @Date: 2020-02-01 17:01:05
 * @LastEditTime : 2020-02-14 13:48:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\dellAnalyzer.ts
 */
const cheerio = require('cheerio');
const fs = require('fs');
import { Analyzer } from './crowller'
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

export default class DellAnalyzer implements Analyzer {
  // 单列模式 让类new 返回同一个实例，不然每次new都是不同的实例
  private static instance: DellAnalyzer;
  static getInstance() {
    if(!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance
  }

  private  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = []
    courseItems.map(element:any => {
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

  private generateJsonContent(courseInfo: CourseResult, filePath: string){
    let fileContent: Content = {}
    if(fs.existsSync(filePath)) {
      // 如果文件存在
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent
  }

  public analyze(html: string, filePath:string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }

  private constructor() {}
}