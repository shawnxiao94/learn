/*
 * @Author: your name
 * @Date: 2020-02-16 15:00:33
 * @LastEditTime : 2020-02-16 15:30:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \namespace\src\page.ts
 */
/// <reference path='./compoents.ts'/>
namespace Home {
  export class Page {
    constructor () {
      new Components.Header()
      new Components.Content()
      new Components.Footer()
    }
  }
}