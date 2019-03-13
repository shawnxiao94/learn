import React, { Component } from 'react';
import store from './store'

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }
  render() {
    return (
      <div className="App">
         <div>
           <input value={this.state.inputValue}/>
           <button>提交</button>

         </div>
         <ul>
            <li>lee</li>
         </ul>
      </div>
    );
  }
}

export default TodoList;
