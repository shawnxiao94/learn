/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-02-01 11:27:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
import superagent = require('superagent');
import cheerio = require('cheerio');

class Crowller {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    console.log(courseItems.length)
    courseItems.map((index,element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(0).text().split(':')[1],10)
      console.log(title)
    })
  }
  
  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.getCourseInfo(result.text)
  }
  constructor() {
    this.getRawHtml();
  }
}

const crowller = new Crowller();