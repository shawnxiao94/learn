import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'

import { ResetStyle } from '@assets/style/common/reset.js'
import { IconFont } from '@assets/iconfont/iconfont.js'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'
import '@data/mock'

const WrappApp = () => {
  return (
    <Fragment>
      <ResetStyle/>
      <IconFont/>
      {/* Provider 连接组件与仓库 */}
      <Provider store={store}>
        <App/>
      </Provider>
    </Fragment>
  )
}

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<WrappApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
