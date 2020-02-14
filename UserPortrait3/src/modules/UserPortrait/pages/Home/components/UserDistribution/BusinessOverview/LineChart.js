/**
  * description: 全局图表组件 - 折线图
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { objectMerge, deepClone } from '@/common/utils/index'
import echarts from 'echarts'
/**
 * 全局图表组件
 */
import Chart from '@/components/Chart'
import { AXIS_OPTION, LINE_SERIES_STYLE } from '@/components/Chart/options'
// import colors from '@/assets/styles/color/color'
/*
 * JS动态色系
 */
// import colors from '@/assets/styles/color/color.js'

class LineCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.setOption()
    }
  }
  /**
   * 图表数据初始化
   */
  setOption() {
    return objectMerge(deepClone(AXIS_OPTION), {
      legend: {},
      grid: {
        top: '4%',
        left: '0',
        right: '2%',
        bottom: '0',
        containLabel: true
      },
      // tooltip: {
      //   formatter(params) {
      //     return `
      //       <div style="color:${colors.gray.colorGrayOtherA}">
      //         ${params[0].name}
      //       </div>
      //       <div style="margin-top:5px;color:${colors.gray.colorGraySSSS}">
      //         ${params[0].value}
      //       </div>
      //     `
      //   }
      // },
      axisPointer: {
        z: 0
      },
      xAxis: {
        boundaryGap: true
      },
      yAxis: {
        minInterval: 1,
        boundaryGap: [0, '10%']
      },
      series: [
        {
          ...LINE_SERIES_STYLE,
          symbol: 'image://' + require('./assets/symbol.png'),
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#1B87ED'
              }, {
                offset: 1,
                color: '#20C3CF'
              }])
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(10, 83, 176, 1)'
            }, {
              offset: 1,
              color: 'rgba(10, 83, 176, .0)'
            }])
          }
        }
      ]
    })
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.setChartsData()
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  /**
   * 设置图表数据
   */
  setChartsData() {
    let option = Object.assign({}, this.state.option)
    option.xAxis.data = this.props.data.map(item => item.date)
    option.series[0].data = this.props.data.map(item => item.value)
    this.setState({ option })
  }
  render() {
    return (
      <Chart option={this.state.option} />
    )
  }
}
export default LineCharts