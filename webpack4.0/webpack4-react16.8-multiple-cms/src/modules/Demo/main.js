/*
 * @Author: your name
 * @Date: 2020-01-02 09:56:38
 * @LastEditTime : 2020-01-19 17:03:16
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\modules\Demo\main.js
 */
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import "./data/mock"
import store from "@/data/store"

/**
 * 全局样式
 */
import "styles/index.less"

/**
 * 页面文件
 */
import App from "./App"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)

/**
 * 启动热加载
 */
if (module.hot) {
  module.hot.accept()
}
