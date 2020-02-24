/*
 * @Author: your name
 * @Date: 2020-02-16 15:00:33
 * @LastEditTime : 2020-02-16 15:08:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \namespace\src\page.ts
 */
namespace Home {
  class Header {
    constructor() {
      return 'this is Header'
    }
  }
  class Content {
    constructor() {
      return 'this is Content'
    }
  }
  class Footer {
    constructor() {
      return 'this is Footer'
    }
  }
  export class Page {
    constructor () {
      new Header()
      new Content()
      new Footer()
    }
  }
}