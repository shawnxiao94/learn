/*
 * @Author: your name
 * @Date: 2020-02-16 15:28:24
 * @LastEditTime : 2020-02-16 15:29:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \namespace\src\compoents.ts
 */
namespace Components {
  export namespace SubComponents {
    export class Test {}
  }
  export interface User {
    name:string;
  }

  export class Header {
    constructor() {
      const elem = document.createElement('div');
      elem.innerHTML = 'this is Header';
      document.body.appendChild(elem)
    }
  }
  export class Content {
    constructor() {
      const elem = document.createElement('div');
      elem.innerHTML = 'this is Content';
      document.body.appendChild(elem)      
    }
  }
  export class Footer {
    constructor() {
      const elem = document.createElement('div');
      elem.innerHTML = 'this is Footer';
      document.body.appendChild(elem)      
    }
  }
}