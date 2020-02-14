/*
 * @Author: your name
 * @Date: 2020-01-03 09:44:11
 * @LastEditTime : 2020-01-03 14:28:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\modules\common\pages\Layouts\index.js
 */
import React, { Component } from "react"
import { Layout } from "antd"
import "./components/index.less"
import Left from "./components/Left"
import Head from "./components/Head"
import Main from "./components/Main"
import Foot from "./components/Foot"

class Layouts extends Component {
  render() {
    return (
      /**
       * React 主题模块
       */
      (
        <Layout className="w-layout">
          <Left />
          <Layout>
            <Head />
            <Main />
            <Foot />
          </Layout>
        </Layout>
      )
    )
  }
}

export default Layouts
