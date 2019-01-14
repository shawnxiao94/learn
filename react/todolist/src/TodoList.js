import React, { Component } from 'react';
import TodoListItem from './TodoListItem.js'

class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickItem = this.handleClickItem.bind(this)
  }

  handleClick () {
    !!String(this.state.inputValue) && this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }

  handleChange (e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleClickItem (index) {
    const list = [...this.state.list]
    list.splice(index,1)
    this.setState({
      list
    })
  }  

  render() {
    return (
      <div className="App">
        <input value={this.state.inputValue} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>add</button>
        <ul>
          {
            this.state.list.map((item,index) => {
              return <TodoListItem handleDelete={this.handleClickItem} key={index} index={index} content={item}/>
            })
          }
        </ul>
      </div>
    );
  }
}

export default TodoList;
