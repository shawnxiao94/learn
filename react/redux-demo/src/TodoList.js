import React from 'react';

// react-redux 的connnet链接API
import { connect } from 'react-redux'

import { getInputchangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

// 无状态组件无生命周期同时也不会生成真正的组件实例，性能最优
const TodoList = (props) => {
  const { inputValue, list, handleChange, handleClick, handleDelete } = props
  return (
    <div className="App">
       <div>
         <input value={inputValue} onChange={handleChange}/>
         <button onClick={handleClick}>提交</button>

       </div>
       <ul>
          {
            list.map((item, index) => {
              return <li key={index} onClick={handleDelete.bind(null,index)}>{item}</li>
            })
          }
       </ul>
    </div>
  )
}

// 链接规则 映射数据 把todolist组建和store做链接
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

// store.dispatch => props
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange (e) {
      const action = getInputchangeAction(e.target.value)
      dispatch(action)
    },
    handleClick () {
      const action = getAddItemAction()
      dispatch(action)
    },
    handleDelete (index) {
      const action = getDeleteItemAction(index)
      dispatch(action)
    }
  }
}

// connect 方法用于将UI组件TodoList 链接自动生成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
