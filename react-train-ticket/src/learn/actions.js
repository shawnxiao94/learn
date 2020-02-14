/*
 * @Author: your name
 * @Date: 2020-01-17 10:42:19
 * @LastEditTime : 2020-01-17 10:46:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-train-ticket\src\learn\actions.js
 */
export function createSet(payload) {
  return {
    type: 'set',
    payload
  }
}
export function createAdd(payload) {
  return {
    type: 'add',
    payload
  }
}
export function createRemove(payload) {
  return {
    type: 'remove',
    payload
  }
}
export function createToggle(payload) {
  return {
    type: 'toggle',
    payload
  }
}