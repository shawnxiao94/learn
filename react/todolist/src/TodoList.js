import React, { Component } from 'react';
import TodoListItem from './TodoListItem.js'
import axios from 'axios'


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
    // !!String(this.state.inputValue) && this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
    !!String(this.state.inputValue) && this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
  }

  handleChange (e) {
    // this.setState({
    //   inputValue: e.target.value
    // })
    const value = e.target.value
    // 异步设置值，提升性能
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleClickItem (index) {
    // 老式写法
    // const list = [...this.state.list]
    // list.splice(index,1)
    // this.setState({
    //   list
    // })
    this.setState((prevState) => {
      const list = [...prevState.list]
      list.splice(index,1)
      return {list}
    })
  }  

  getTodoItem () {
    return this.state.list.map((item,index) => {
      return <TodoListItem handleDelete={this.handleClickItem} key={index} index={index} content={item}/>
    })
  }


  componentDidMount() {
    axios.get('/api/todolist').then((res) => {
      alert('suc')
      this.setState(() => ({
        list: [...res.data]
      }))
    }).catch((err) => {
      alert('err')
    })
  }



  render() {
    return (
      <div className="App">
        {/** 
          label for属性可以用来扩大input输入框光标聚焦的范围 
          但react里用htmlFor
        */}
        <label htmlFor="insertArea">输入内容：</label>
        <input id="insertArea" value={this.state.inputValue} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>add</button>
        <ul>
          { this.getTodoItem() }
        </ul>
      </div>
    );
  }
}

export default TodoList;
