/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-01-30 13:32:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */

 // ts直接引用js会提示错误，通过.d.ts 翻译文件转成 js 文件
import superagent from 'superagent';

class Crowller {
  private secret = 'secretKey'
  private url = `http://dell-lee.com/typescript/demo.html?secret=${this.secret}`
  private rawHtml = '';
  async getRawHtml() {
    const result = await superagent.get(this.url)
    console.log(result.text)
  }
  constructor() {
    this.getRawHtml();
  }
}

const crowller = new Crowller();