// 容器组件 聪明组件 只负责业务逻辑处理
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import store from './store'
import { getInputChangeAction, getAddTodoAction, getDeleteTotoAction } from './store/actionCreators'
import TodoListUI from './TodoListUI';
class TodoList extends Component {
  
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleItemDlete = this.handleItemDlete.bind(this);
    // 监听store数据变化
    store.subscribe(this.handleStoreChange)
  }

  render() {
    return (
      <TodoListUI 
        inputValue={this.state.inputValue} 
        handleInputChange={this.handleInputChange}
        handleClick={this.handleClick}
        list={this.state.list}
        handleItemDlete={this.handleItemDlete}
      />
    )
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }
  // 当感知到数据变化时候就把store上的数据更新到state
  handleStoreChange () {
    this.setState(store.getState())
  }
  handleClick () {
    const action = getAddTodoAction()
    store.dispatch(action)
  }

  handleItemDlete(index) {
    const action = getDeleteTotoAction(index)
    store.dispatch(action)
  }

}

export default TodoList;
