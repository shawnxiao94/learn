import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
// Provider,作用是让所有子组件都可以拿到state
import { Provider } from 'react-redux'
import store from './store'

const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));
