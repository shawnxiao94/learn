import React, { Component } from 'react';
import { GlobalStyle } from './style.js';
import { IconFont } from './statics/iconfont/iconfont.js';
import Header from './common/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyle/>
        <IconFont/>
        <Header/>
        hello world
      </div>
    )
  }
}

export default App;
