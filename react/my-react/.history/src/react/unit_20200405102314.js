/*
 * @Author: your name
 * @Date: 2020-04-05 10:15:53
 * @LastEditTime: 2020-04-05 10:22:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-react\src\react\unit.js
 */
class Unit {
  // 通过父类保存参数
  constructor(element) {
    this.element = element
  }
}
class ReactTextUnit extends Unit{
  getMarkUp(rootId) {
    // 保存当前元素ID
    this._rootId = rootId
    let markUp = `<span data-reactid="${rootId}">${this.element}</span>`
  }
}

function createReactUnit (element) {
  if(typeof element == 'string' || typeof element === 'number') {
    return new ReactTextUnit(element)
  }
}

export default createReactUnit;