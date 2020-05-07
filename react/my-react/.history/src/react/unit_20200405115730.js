/*
 * @Author: your name
 * @Date: 2020-04-05 10:15:53
 * @LastEditTime: 2020-04-05 11:57:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-react\src\react\unit.js
 */
import $ from 'jquery'
class Unit {
  // 通过父类保存参数
  constructor(element) {
    this.currentElement = element
  }
}
class ReactTextUnit extends Unit{
  getMarkUp(rootId) {
    // 保存当前元素ID
    this._rootId = rootId
    return `<span data-reactid="${rootId}">${this.currentElement}</span>`
  }
}
class ReactNativeUnit extends Unit {
  getMarkUp(rootId) {
    this._rootId = rootId;
    // 拼接需要渲染的内容
    let { type ,props } = this.currentElement;
    let tagStart = `<${type} data-reactid="${rootId}"`
    let tagEnd = `</${type}>`
    let contentStr;
    for(let propName in props) {
      if(/on[A-Z]/.test(propName)) {
        // on开头的字符串 则是事件处理
        let eventType = propName.slice(2).toLocaleLowerCase(); // click
        // react里面的事件都是通过事件委托的方式来绑定
        $(document).on(eventType, `data-reactid="${rootId}"`, props[propName]);
      }else if(propName === 'children') {
        contentStr = props[propName].map((child,idx) => {
          // 递归循环子节点
          let childInstance = createReactUnit(child);
          // 返回的是多个元素的的字符串数组
          return childInstance.getMarkUp(`${rootId}.${idx}`)
        }).join('');
      }else {
        tagStart += (` ${propName}=${props[propName]}`)
      }
    }
    // 返回拼接后的字符串
    return tagStart + '>' + contentStr + tagEnd
  }
}
// 负债渲染react 组件
class ReactCompositUnit extends Unit {
  getMarkUp(rootId) {
    this._rootId = rootId
  }
}

function createReactUnit (element) {
  if(typeof element == 'string' || typeof element === 'number') {
    return new ReactTextUnit(element)
  }
  if(typeof element === 'object' && typeof element.type === 'string') {
    return new ReactNativeUnit(element);
  }
  if(typeof element === 'object' && typeof element.type === 'function') {
    return new ReactCompositUnit(element);
  }
}

export default createReactUnit;