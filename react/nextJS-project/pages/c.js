import React, { Component, useState, useEffect, useLayoutEffect, useReducer } from 'react'

class MyCount extends Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000)
  }
  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval)
    }
  }
  render () {
    return (
      <div>
        <h2>c page</h2>
        <span>{this.state.count}</span>
      </div>
    )
  }
  
}

function MyCountFunc() {
  // const [count, setCount] = useState(0) // 返回数组[a,b]，通过解构使用

  const [ count, dispatchCount ] = useReducer(CountReducer, 0)
  const [name, setName ] = useState('jokcy')

  useEffect(() => {
    const interval = setInterval(() => {
      // setCount(c => c + 1)
      dispatchCount({ type: 'minus'})
    }, 1000)
    return () => clearInterval(interval)
  }, []) // useEffect 第二个参数作用 => 没有第二个参数时会不断重复渲染，第二个参数为空数组时只渲染一次。第二个参数有依赖时则依据依赖的变量变化而渲染，变量未变化则不渲染

  useEffect(() => {
    console.log('effect invoked')
    return () => console.log('effect deteched')
  }, [name])

  // useLayoutEffect会比useEffect先执行，会在没更新成真正的DOM之前会先执行，useEffect会等插入DOM真实节点后执行
  useLayoutEffect(() => {
    console.log('layout effect invoked')
    return () => console.log('layout effect deteched')
  }, [name])

  return (
    <div>
      <h2>c page MyCountFunc</h2>
      <span>{count}</span>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => dispatchCount({type:'add'})}>{count}</button>
    </div>
  )
}

function CountReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default :
      return state
  }
}

export default MyCountFunc