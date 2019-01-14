import React, { Component } from 'react';

class TodoListItem extends Component {
// 子组件要和父组件通信，
// 子向父传：需要调用父组件传来的方法进行传值
// 父向子传：直接组件赋值子组件通过props接收传值
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    this.props.handleDelete(this.props.index)
  }

  render(){
    return (
      <div>
        {
          <li onClick={this.handleDelete}>{this.props.content}</li>
        }
      </div>
    )
  }
}

export default TodoListItem