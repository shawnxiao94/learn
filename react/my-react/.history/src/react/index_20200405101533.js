/*
 * @Author: your name
 * @Date: 2020-04-05 10:05:35
 * @LastEditTime: 2020-04-05 10:15:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-react\src\react\index.js
 */
import $ from 'jquery';
let React = {
  render,
  nextRootIndex: 0
}

// 给每个元素 添加一个属性，为了方便获取到这个元素
function render(element, container) {
  // 写个工厂函数，来创建对应的react元素
  // 通过这个工厂函数来创建
  let createReactUnit = createReactUnit(element);
  let markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex); 
  let markUp = `<span data-reactid="${React.nextRootIndex}">${element}</span>`
  $(container).html(markUp)
}

export default React