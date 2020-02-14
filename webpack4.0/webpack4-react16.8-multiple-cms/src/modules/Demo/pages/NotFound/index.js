/*
 * @Author: your name
 * @Date: 2020-01-03 14:06:43
 * @LastEditTime : 2020-01-03 14:11:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\modules\Demo\pages\NotFound\index.js
 */

import React from "react"
import img from "@/assets/images/404.png"
import "./index.less"

const NotFound = () => (
  <div className="w-notfound">
    <img src={img} alt="404" />
  </div>
)

export default NotFound
