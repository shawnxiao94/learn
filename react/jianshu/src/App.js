import React, { Component } from 'react';
import Header from './common/header'
import { GlobalStyle } from './style.js'
import { IconFont } from './statics/iconfont/iconfont.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyle/>
        <IconFont/>
        <Header></Header>
      </div>
    );
  }
}

export default App;
