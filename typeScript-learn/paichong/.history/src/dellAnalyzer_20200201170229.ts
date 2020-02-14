/*
 * @Author: your name
 * @Date: 2020-02-01 17:01:05
 * @LastEditTime: 2020-02-01 17:01:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\dellAnalyzer.ts
 */
class DellAnalyzer {
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
  public crow
}