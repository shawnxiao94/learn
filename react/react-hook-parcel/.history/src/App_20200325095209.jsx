import React, { useState, userEffect } from "react";

/*
 * @Author: your name
 * @Date: 2020-03-25 09:43:15
 * @LastEditTime: 2020-03-25 09:52:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-hook-parcel\src\app.jsx
 */
export default function App () {
  const [selected, setSelected] = useState('*')
  const [started, setStarted] = useState(false)

  return (
    <div>
      <div>{selected}</div>
      <button onClick={() => setStarted(!started)}>{started ? '结束' : '开始'}</button>
    </div>
  )
}