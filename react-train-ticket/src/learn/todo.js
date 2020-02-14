/*
 * @Author: your name
 * @Date: 2020-01-16 13:44:58
 * @LastEditTime : 2020-01-18 10:02:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-train-ticket\src\redux.js
 */
import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import './todo.css'

import {
  createSet,
  createAdd,
  createRemove,
  createToggle
} from './actions'

let idSeq = Date.now()

/*
* @actionCreators: object
* @dispatch: function
* @return: object
*/
function bindActionCreators(actionCreators, dispatch) {
  const ret = {}
  // eslint-disable-next-line no-unused-vars
  for(let key in actionCreators) {
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return ret;
}

const Control = memo(function (props) {
  const {addTodo} = props
  // const {dispatch} = props
  const inputRef = useRef()
  const onSubmit = e => {
    e.preventDefault();
    const newText = inputRef.current.value.trim()
    if(newText.length ===0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })
    // dispatch(createAdd({
    //   id: ++idSeq,
    //   text: newText,
    //   complete: false
    // }))  
    inputRef.current.value = ''
  }
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" className="new-todo" placeholder="what needs to be done?"></input>
      </form>
    </div>
  )
})

const TodoItem = memo(function (props) {
  const {todo: {id,text,complete}, toggleTodo, removeTodo} = props
  // const {todo: {id,text,complete}, dispatch} = props
  const onChange = () => {
    toggleTodo(id)
    // dispatch(createToggle(id))
  }
  const onRemove = () => {
    removeTodo(id)
    // dispatch(createRemove(id))
  }
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete}></input>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function (props) {
  const {todos, toggleTodo, removeTodo} = props
  // const {todos, dispatch} = props
  return (
    <ul>
      {
        todos.map(todo => {
          return (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}/>
          )
        })
      }
      {/* {
        todos.map(todo => {
          return (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              dispatch={dispatch}/>
          )
        })
      } */}
    </ul>
  )
})

const LS_KEY = '_$-todos_'

function TodoList () {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  // const addTodo = useCallback((todo) => {
  //   setTodos(todos => [...todos, todo])
  // }, [])

  // const removeTodo = useCallback((id) => {
  //   setTodos(todos => todos.filter(todo => {
  //     return todo.id !== id
  //   }))
  // },[])

  // const toggleTodo = useCallback((id) => {
  //   setTodos(todos => todos.map(todo => {
  //     return todo.id === id ? {...todo,complete: !todo.complete} : todo
  //   }))
  // }, [])

  const dispatch = useCallback(action => {
    const { type, payload } = action
    switch(type) {
      case 'set':
        setTodos(payload);
        setIncrementCount(c => c + 1);
        break;
      case 'add':
        setTodos(todos => [...todos, payload]);
        setIncrementCount(c => c + 1);
        break;
      case 'remove':
        setTodos(todos => todos.filter(todo => {
          return todo.id !== payload
        }))
        break;
      case 'toggle':
        setTodos(todos => todos.map(todo => {
          return todo.id === payload ? {...todo,complete: !todo.complete} : todo
        }))
        break;
        default:
          break;
    }
  }, [])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]') 
    // setTodos(todos)
    dispatch(createSet(todos))
  }, [dispatch])

  useEffect(()=> {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
  <div className="todo-list">
    {/* <Control addTodo={addTodo}></Control>
    <Todos removeTodo={removeTodo} todos={todos} toggleTodo={toggleTodo}></Todos> */}
    {/* <Control dispatch={dispatch}></Control>
    <Todos dispatch={dispatch} todos={todos}></Todos> */}
    <Control 
      {
        ...bindActionCreators({
          addTodo: createAdd,
        }, dispatch)
      }></Control>
    <p>{incrementCount}</p>
    <Todos
      {
        ...bindActionCreators({
          toggleTodo: createToggle,
          removeTodo: createRemove
        }, dispatch)
      }
      todos={todos}></Todos>
  </div>
  )
}

export default TodoList
