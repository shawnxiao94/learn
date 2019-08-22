import React, { useState, useEffect, useMemo } from 'react';

import './App.css';



function App () {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }

  // useMemo 是渲染时就执行的，useEffect是副作用时候执行通俗就是类似componentDidmount和componentDidUpdate钩子时执行
  const double = useMemo(() => {
    return count * 2;
  }, [count]);

  const half = useMemo(() => {
    return double / 4;
  }, [double]);

  // const [clickCount, setClickCount] = useState(0);

  // const onClick2 = useCallback(() => {
  //   console.log('click2');
  //   setClickCount((clickCount) => clickCount + 1);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [clickCount]);

  useEffect(() => {
    document.title = count;
  })

  useEffect(() => {
    console.log(count)
  }, [count])// 只有当count的值发生变化时，才会重新执行
  // 第二个参数传一个空数组[]时，其实就相当于只在首次渲染的时候执行只执行一次。也就是componentDidMount或componentWillUnmount的模式。不过这种用法可能带来bug，少用。

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      // 注销解绑
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  const onClick = () => {
    console.log('click');
  };

  useEffect(()=> {
    document.querySelector("#size").addEventListener('click', onClick, false)

    return () => {
      document.querySelector("#size").removeEventListener('click',onClick, false)
    }

  })

  return (
    <div>
      <button type="button" onClick={() => {setCount(count + 1)}}>
        click({count})      
        double: ({double})
        half: ({half})
        {/* onClick2: ({onClick2}) */}
      </button>
      {
        count%2 ? <span id="size">size: {size.width}X{size.height}</span> :
        <p id="size">size: {size.width}X{size.height}</p>
      }
    </div>
  )
}

export default App;
