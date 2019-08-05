import React from 'react';
import { GlobalStyle } from './style.js';
import { IconFont } from './statics/iconfont/iconfont.js';
import Header from './common/header';
import { Provider } from 'react-redux';
import store from './store'

// 只有render函数的适合建议采用无状态组件，性能更优
const App = () => {
  return (
    <div className="App">
      <GlobalStyle/>
      <IconFont/>
      <Provider store={store}>
        <Header/>
        hello world
      </Provider>
    </div>
  )
}
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <GlobalStyle/>
//         <IconFont/>
//         <Provider store={store}>
//           <Header/>
//           hello world
//         </Provider>
//       </div>
//     )
//   }
// }

export default App;
