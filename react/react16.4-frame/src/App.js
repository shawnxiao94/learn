import React from 'react';
import { ResetStyle } from '@assets/style/common/reset.js';
import { IconFont } from '@assets/iconfont/iconfont.js';
import { Provider } from 'react-redux';
import store from './store';
import Layout from '@pages/Layouts'

const App = () => {
  return (
    <div className="App">
      <ResetStyle/>
      <IconFont/>
      {/* Provider 连接组件与仓库 */}
      <Provider store={store}>
        <Layout/>
      </Provider>
    </div>
  )
}

export default App;