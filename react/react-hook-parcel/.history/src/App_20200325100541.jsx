import React, { useState, userEffect } from "react";
import styled from 'react-emotion'

/*
 * @Author: your name
 * @Date: 2020-03-25 09:43:15
 * @LastEditTime: 2020-03-25 10:05:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-hook-parcel\src\app.jsx
 */
const lists = [
  '说出自己的5个缺点',
  '绕场两周',
  '拍一张自拍放实习生群里',
  '成功3个你说我猜',
  '记住10个在场小伙伴的名字',
  '大声说出自己的名字，”我是xxx“3遍',
  '拍两张自拍放实习生群里',
  '选择另一位小伙伴继续游戏',
  '直接通过',
  '介绍左右两个小伙伴',
]

function chooseOne(selected) {
  let n = ''
  do {
    n = lists[Math.floor(Math.random() * lists.length)]
  } while ( n === selected )
  return n
}

export default function App () {
  const [selected, setSelected] = useState('-')
  const [started, setStarted] = useState(false)

  function onClick() {
    setStarted(!started)
  }

  userEffect(() => {
    if(started) {
      const timer = setInterval(() => {
        setSelected(chooseOne(selected))
      }, 60)
      return () => clearInterval(timer)
    }    
  }, [started])

  return (
    <div>
      <div>{selected}</div>
      <button onClick={onClick}>{started ? '结束' : '开始'}</button>
    </div>
  )
}