/*
 * @Author: your name
 * @Date: 2020-04-05 10:29:29
 * @LastEditTime: 2020-04-05 10:32:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-react\src\react\element.js
 */
function creactElement(type, props, children) {

}

// 返回虚拟DOM，用对象来描述元素
export default creactElement

{
  type: 'div',
  props: {
    name: 'xxx',
    children: [
      'say',
      {
        type: 'span',
        props: {
          children: ['你好']
        }
      }
    ]
  }
}