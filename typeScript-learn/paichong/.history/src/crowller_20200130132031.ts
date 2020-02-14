/*
 * @Author: your name
 * @Date: 2020-01-30 13:03:11
 * @LastEditTime : 2020-01-30 13:20:31
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\crowller.ts
 */
class Crowller {
  private secret = 'secretKey'
  private url = `http://dell-lee.com/typescript/demo.html?secret=${this.secret}`
  constructor() {
    console.log('constructor')
  }
}

const crowller = new Crowller();