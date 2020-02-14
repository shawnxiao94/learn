import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle } from '@assets/style/common/reset.js';
import { IconFont } from '@assets/iconfont/iconfont.js';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import '@data/mock'

import * as serviceWorker from './serviceWorker';

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

ReactDOM.render(<WrappApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
if ('production' === process.env.NODE_ENV) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}