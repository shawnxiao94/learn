import React, { 
  Component,
  useState, 
  useEffect, 
  useLayoutEffect, 
  useReducer,
  useRef,
  memo,
  useMemo,
  useCallback
 } from 'react'

class MyCount extends Component {
  constructor () {
    super()
    this.spanRef = React.createRef()
    this.h2Ref = React.createRef()
  }
  state = {
    count: 0
  }

  componentDidMount() {
    console.log(this.h2Ref.current, this.spanRef.current)
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
        <h2 ref={this.h2Ref}>c page</h2>
        <span ref={this.spanRef}>{this.state.count}</span>
      </div>
    )
  }
  
}

function MyCountFunc() {
  // const [count, setCount] = useState(0) // 返回数组[a,b]，通过解构使用

  const [ count, dispatchCount ] = useReducer(CountReducer, 0)
  const [name, setName ] = useState('jokcy')

  const inputRef = useRef()
  const spanRef = useRef()

  const config = useMemo(() => ({
    text:  `count is ${count}`,
    color: count > 3 ? 'red' : 'blue'
  }), [count])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(c => c + 1)
  //     dispatchCount({ type: 'add'})
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, []) // useEffect 第二个参数作用 => 没有第二个参数时会不断重复渲染，第二个参数为空数组时只渲染一次。第二个参数有依赖时则依据依赖的变量变化而渲染，变量未变化则不渲染

  useEffect(() => {
    console.log('effect invoked')
    return () => console.log('effect deteched')
  }, [name])

  // useLayoutEffect会比useEffect先执行，会在没更新成真正的DOM之前会先执行，useEffect会等插入DOM真实节点后执行
  useLayoutEffect(() => {
    console.log('layout effect invoked')
    console.log(inputRef.current,spanRef.current)
    return () => console.log('layout effect deteched')
  }, [name])

  const handleButtonClick  = useCallback(() => dispatchCount({type: 'add'}), [])
  // const handleButtonClick  = useMemo( () => () => dispatchCount({type: 'add'}) ,[])

  return (
    <div>
      <h2>c page MyCountFunc</h2>
      <span ref={spanRef}>{count}</span>
      <input ref={inputRef} value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => dispatchCount({type:'add'})}>{count}</button>
      <Child
        config={config}
        onButtonClick={handleButtonClick}
      >
      </Child>
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

// memo 用于优化子组件不重复渲染类似shouldComponentUpdate
// useMemo 用于优化业务逻辑不重复渲染
// useCallback和useMemo功能一样，只是它接收的参数为函数,是useMemo的简化用法
const Child = memo(function Child({ onButtonClick, config }) {
  console.log('child render')
  return (
    <button onClick={onButtonClick} style={{color: config.color}}>
      { config.text }
    </button>
  )
})

export default MyCountFunc