import React, { useState, userEffect } from "react";
// import styled from 'react-emotion'
import styled from 'styled-components';

/*
 * @Author: your name
 * @Date: 2020-03-25 09:43:15
 * @LastEditTime: 2020-03-25 11:49:55
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

const Root = styled.div`
  background: #FF4C19;
  height: 100vh;
  width: 100vw;
  text-align: center;
`
 
const Title = styled.div`
  height: 50%;
  font-size: 18vh;
  text-align: center;
  color: white;
  padding: 0 10vw;
  font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";
`
 
const Button = styled.button`
  outline: none;
  border: 2px solid white;
  border-radius: 100px;
  min-width: 120px;
  width: 30%;
  text-align: center;
  font-size: 12vh;
  line-height: 20vh;
  margin-top: 15vh;
  color: #FF4C19;
  cursor: pointer;
`

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
    <Root>
      <Title>{selected}</Title>
      <Button onClick={onClick}>{started ? '结束' : '开始'}</Button>
    </Root>
  )
}