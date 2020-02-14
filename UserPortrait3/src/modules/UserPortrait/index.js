import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import './data/mock'
import '@/assets/icons'
/**
 * 全局样式
 */
import '@/assets/styles/index.less'

/**
 * 页面文件
 */
import Pages from './pages'

/**
 * 设置多语言
 */
import {
  ConfigProvider
} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import RouterScrollToTop from '@/components/RouterScrollToTop'
import Empty from '@/components/UI/Empty'
moment.locale('zh-cn')

class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN} renderEmpty={Empty}>
        <HashRouter>
          <RouterScrollToTop>
            <Pages />
          </RouterScrollToTop>
        </HashRouter>
      </ConfigProvider>
    )
  }
}

render(<App />, document.getElementById('root'))

/**
 * 启动热加载
 */
if (module.hot) {
  module.hot.accept()
}
