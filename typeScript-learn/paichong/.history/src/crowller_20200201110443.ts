/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-02-01 11:04:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
import superagent = require('superagent');

class Crowller {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  async getRawHtml() {
    const result = await superagent.get(this.url)
    this.getCourseInfo(result.text)
  }
  constructor() {
    this.getRawHtml();
  }
}

const crowller = new Crowller();