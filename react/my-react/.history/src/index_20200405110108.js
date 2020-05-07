/*
 * @Author: your name
 * @Date: 2020-04-05 10:03:45
 * @LastEditTime: 2020-04-05 11:01:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-react\src\index.js
 */
import React from './react';

let element = React.creactElement('div',{name: 'xxx'},'hello',React.creactElement('span',{},'world'))
console.log(element);
React.render(element, document.getElementById('root'))