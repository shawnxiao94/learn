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
import Pages from '@pages'
import { Login, ErrorPage404, ErrorPage403 } from '@router/config'

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
            <Pages/>
            <Route exact path='/403' component={ErrorPage403}/>
            <Route component={ErrorPage404} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  )
}

export default App;