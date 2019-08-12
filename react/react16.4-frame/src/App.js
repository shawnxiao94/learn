import React, { Fragment } from 'react';
import { ResetStyle } from '@assets/style/common/reset.js';
import { IconFont } from '@assets/iconfont/iconfont.js';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import store from './store';
// import Pages from '@pages'

import Loadable from 'react-loadable'
import DelayLoading from '@/components/DelayLoading'

import Pages from '@pages'

export const Login = Loadable({
  loader: () => import('@pages/Login'),
  loading: DelayLoading, delay:3000
});
const ErrorPage = Loadable({
  loader: () => import('@pages/ErrorPage'),
  loading: DelayLoading, delay:3000
});


const App = () => {
  return (
    <Fragment>
      <ResetStyle/>
      <IconFont/>
      {/* Provider 连接组件与仓库 */}
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/404" component={ErrorPage} />
            <Pages/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  )
}

export default App;