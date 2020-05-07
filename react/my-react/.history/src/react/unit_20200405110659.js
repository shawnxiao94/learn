/*
 * @Author: your name
 * @Date: 2020-04-05 10:15:53
 * @LastEditTime: 2020-04-05 11:05:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-react\src\react\unit.js
 */
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
      if(propName === 'children') {
        contentStr = props[propName].map((child,idx) => {
          // 递归循环子节点
          let childInstance = createReactUnit(child);
          return childInstance.getMarkUp(`${rootId}.${idx}`)
        }).join('');
      }else {
        tagStart += (` ${propName}=${props[propName]}`)
      }
    }
    return tagStart + '>' + contentStr + tagEnd
  }
}

function createReactUnit (element) {
  if(typeof element == 'string' || typeof element === 'number') {
    return new ReactTextUnit(element)
  }
  if(typeof element === 'object' && typeof element.type === 'string') {
    return new ReactNativeUnit(element);
  }
}

export default createReactUnit;