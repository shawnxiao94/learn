import React, { Fragment } from 'react';
import { ResetStyle } from '@assets/style/common/reset.js';
import { IconFont } from '@assets/iconfont/iconfont.js';
import { Provider } from 'react-redux';
import {
  BrowserRouter
} from 'react-router-dom';
import store from './store';
import Layout from '@pages/Layouts'

const App = () => {
  return (
    <Fragment>
      <ResetStyle/>
      <IconFont/>
      {/* Provider 连接组件与仓库 */}
      <Provider store={store}>
        <BrowserRouter>
          <Layout/>
        </BrowserRouter>
      </Provider>
    </Fragment>
  )
}

export default App;