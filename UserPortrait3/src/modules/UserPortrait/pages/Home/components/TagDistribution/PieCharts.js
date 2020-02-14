/**
  * description: 全局图表组件
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { objectMerge, deepClone } from '@/common/utils/index'
import Chart from '@/components/Chart'
import { DEFAULT_OPTION, PIE_SERIES_STYLE } from '@/components/Chart/options'
import { formatFloat } from '@/common/utils'
import colors from '@/assets/styles/color/color'
/**
 * 全局图表组件
 */

class PieCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.setOption()
    }
  }
  /**
   * 图表数据深拷贝赋值
   */
  setOption() {
    return objectMerge(deepClone(DEFAULT_OPTION), {
      tooltip: {
        formatter(params) {
          return `
            <span style="display:inline-block;vertical-align:middle;margin-right:5px;border-radius:100%;width:6px;height:6px;background-color:${params.color};"></span>
            <span style="color:${colors.gray.colorGrayOtherA}">
              ${params.data.name}
            </span> 
            <span style="margin-left:5px;color:${colors.gray.colorGraySSSS}">
              ${params.data.value}
            </span>
          `
        }
      }
    })
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.setChartsData()
  }
  /**
   * 设置图表所需数据
   */
  setChartsData() {
    let option = Object.assign({}, this.state.option)
    option.series = [
      {
        ...PIE_SERIES_STYLE,
        type: 'pie',
        avoidLabelOverlap: false,
        data: [],
        label: {
          show: false
        }
      }
    ]

    let _top = this.calcPiePosition(option)
    
    option.series[0].data = this.props.data
    /**
     * 设置用户总量
     * graphic自定义球体中心样式
     */
    option.graphic = [
      {
        id: 'centerText',
        type: 'group',
        bounding: 'raw',
        left: '50%',
        top: _top,
        z: 1,
        children: [
          {
            type: 'text',
            left: 'center',
            top: -14,
            z: 2,
            style: {
              fill: '#fff',
              text: this.props.count,
              fontSize: '28',
              fontWeight: '300'
            }
          },
          {
            type: 'text',
            left: 'center',
            top: -28,
            z: 2,
            style: {
              fill: 'rgba(241, 242, 243, 0.45)',
              text: this.props.countName,
              fontSize: '12'
            }
          }
        ]
      }
    ]

    // 图标导航Icon
    option.legend = {
      width: '100%',
      left: 'center',
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      inactiveColor: colors.gray.colorGrayX,
      data: option.series[0].data.map(item => item.name),
      textStyle: {
        rich: {
          a: {
            color: '#AFB0B3',
            fontSize: 12,
            width: 55,
            lineHeight: 14
          },
          line: {
            height: 12,
            width: 1,
            backgroundColor: '#41444A',
            lineHeight: 14
          },
          b: {
            padding: [0, 0, 0, 5],
            color: '#787A7E',
            fontSize: 12,
            width: 40,
            lineHeight: 14
          },
          c: {
            padding: [0, 0, 0, 10],
            color: '#AFB0B3',
            fontSize: 12,
            width: 40,
            lineHeight: 14
          }
        }
      },
      formatter: function(name) {
        let result = ''
        let num = 0
        option.series[0].data.map(item => {
          num = num + item.value
              
        })
        num = num || 1
        option.series[0].data.find(item => {
          if (item.name === name) {
            result = `{a|${name}}{line|}{b|${formatFloat(item.value / num * 100)}%}{c|${item.value}}`
          }
        })
        return result
      }
    }
    this.setState({ option })
  }
  /**
   * 图表重置
   */
  resize() {
    let option = Object.assign({}, this.state.option)
    let _top = this.calcPiePosition(option)
    option.graphic = {
      id: 'centerText',
      top: _top
    }
    this.setState({ option })
  }

  /**
   * 响应式计算饼图位置
   */
  calcPiePosition(option) {
    const w = window.innerWidth
    let _minWidth, _maxWidth, _top
    if (w <= 1400) {
      _minWidth = 0.6
      _maxWidth = 0.75
      _top = this.props.element.offsetWidth * _maxWidth / 2 + 35
    } else if (w <= 1600) {
      _minWidth = 0.6
      _maxWidth = 0.75
      _top = this.props.element.offsetWidth * _maxWidth / 2 + 20
    } else if (w <= 2000) {
      _minWidth = 0.55
      _maxWidth = 0.7
      _top = this.props.element.offsetWidth * _maxWidth / 2 + 25
    } else {
      _minWidth = 0.55
      _maxWidth = 0.7
      _top = this.props.element.offsetWidth * _maxWidth / 2 + 10
    }
    option.series[0].radius = [Math.floor(_minWidth * 100) + '%', Math.floor(_maxWidth * 100) + '%']
    option.series[0].center = ['50%', _top]
    return _top
  }

  render() {
    return (
      <Chart option={this.state.option} resize={this.resize.bind(this)} />
    )
  }
}
export default PieCharts