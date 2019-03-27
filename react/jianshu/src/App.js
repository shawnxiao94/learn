import React, { Component } from 'react';
import Header from './common/header';
import { GlobalStyle } from './style.js';
import { IconFont } from './statics/iconfont/iconfont.js';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyle/>
        <IconFont/>
        <Provider store={store}>
          <Header/>
        </Provider>
      </div>
    );
  }
}

export default App;
