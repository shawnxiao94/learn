/*
 * @Author: your name
 * @Date: 2020-01-03 14:22:13
 * @LastEditTime : 2020-01-03 14:24:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\modules\common\pages\Layouts\components\PageLoading.js
 */

import React from "react"
import { Spin } from "antd"

const PageLoading = () => (
  <div className="page-loading">
    <Spin tip="Loading..." />
  </div>
)

export default PageLoading
