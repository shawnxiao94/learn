/*
 * @Author: your name
 * @Date: 2020-02-01 17:01:05
 * @LastEditTime : 2020-02-01 17:09:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\dellAnalyzer.ts
 */

interface Course {
  title: string;
  count: number;
}

export default class DellAnalyzer {
  private  getCourseInfo(html: string) {
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

  generateJsonContent(courseInfo: CourseResult){
    let fileContent: Content = {}
    if(fs.existsSync(this.filePath)) {
      // 如果文件存在
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent
  }

  public analyze(html: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo)
    return JSON.stringify(fileContent)
  }
}