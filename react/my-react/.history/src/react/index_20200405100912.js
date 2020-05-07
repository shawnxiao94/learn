/*
 * @Author: your name
 * @Date: 2020-04-05 10:05:35
 * @LastEditTime: 2020-04-05 10:09:12
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
  let markUp = `<span data-reactid="${React.nextRootIndex}">${element}</span>`
  $(container).html(markUp)
}

export default React