import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import './data/mock'
/**
 * 全局样式
 */
import '@/assets/styles/index.less'

/**
 * 页面文件
 */
import Pages from './pages'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Pages />
      </HashRouter>
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
