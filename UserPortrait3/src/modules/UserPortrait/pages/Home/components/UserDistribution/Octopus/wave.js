/**
  * description: 全局图表组件 - 业务概览水波图
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import WWave from '@/components/Chart/WWave'
import color from '@/assets/styles/color/color'
import { throttle } from 'throttle-debounce'
class Wave extends Component {
  constructor(props) {
    super(props)
    /**
       * 节流图表resize事件，声明公用变量方便注册和销毁
       */
    this.throttleFunction = throttle(100, this.resize)
  }
  resize = () => {
    this.wwave && this.wwave.resize()
  };
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.initChart()
  }
  /**
   * 初始化水波图
   */
  initChart() {
    this.wwave = new WWave('#WWave',
      {
        ball: {
          // 中心球体
          boreBall: {},
          // 分支球体
          subBall: {
            colors: [['#4AA5D8', '#439FD5'], ['#4AA5D8', '#439FD5']]
          },
          // 边线宽度
          lineWidth: 2,
          lineColor: '#23262B',
          lineHoverColor: color.primaryColor
        }
      },
      this.props.data
    )
    window.addEventListener('resize', this.throttleFunction)
  }
  dispose = () => {
    window.removeEventListener('resize', this.throttleFunction)
    this.throttleFunction.cancel()
  };
  render() {
    return (
      <div id='WWave'
        style={{
          height: '100%'
        }}
      >
      </div>
    )
  }
}
export default Wave