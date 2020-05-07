/*
 * @Author: your name
 * @Date: 2020-04-08 15:36:51
 * @LastEditTime: 2020-04-08 15:38:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-hooks-frame\src\common\utils\loadable.js
 */
import React from 'react'
import Loadable from 'react-loadable'
import loadingComponent from '@/components/DelayLoading'

// 通用的过场组件
// const loadingComponent = () => {
//   return (
//     <div>loading</div>
//   )
// }

// 过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading
  })
}
