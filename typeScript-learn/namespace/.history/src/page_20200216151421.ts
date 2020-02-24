/*
 * @Author: your name
 * @Date: 2020-02-16 15:00:33
 * @LastEditTime : 2020-02-16 15:14:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \namespace\src\page.ts
 */
namespace Home {
  class Header {
    constructor() {
      const elem = document.createElement('div');
      elem.innerHTML = 'this is Header';
      document.body.appendChild(elem)
    }
  }
  class Content {
    constructor() {
      const elem = document.createElement('div');
      elem.innerHTML = 'this is Content';
      document.body.appendChild(elem)      
    }
  }
  class Footer {
    constructor() {
      const elem = document.createElement('div');
      elem.innerHTML = 'this is Footer';
      document.body.appendChild(elem)      
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