/**
  * description: 用户数占比图表
  * author: William
  */
import React, { Component } from 'react'
import { objectMerge, deepClone } from '@/common/utils/index'
import Chart from '@/components/Chart'
import { DEFAULT_OPTION, PIE_SERIES_STYLE } from '@/components/Chart/options'
// import { formatFloat } from '@/common/utils'
import colors from '@/assets/styles/color/color'
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

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setChartsData(nextProps.data, nextProps.count)
    }
  }
  /**
   * 设置图表所需数据
   */
  setChartsData(nextPropsData, nextPropsCount) {
    let data = nextPropsData || this.props.data || []
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
    
    option.series[0].data = data
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
              text: window.isEmpty(nextPropsCount) ? this.props.count : nextPropsCount,
              fontSize: '22',
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
              text: '总用户数',
              fontSize: '14'
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
      data: option.series[0].data.map(item => item.name).slice(0, window.innerWidth <= 1477 ? 6 : (window.innerWidth <= 1785 ? 12 : 20)),
      textStyle: {
        rich: {
          a: {
            color: '#AFB0B3',
            fontSize: 14,
            width: 80,
            lineHeight: 18
          }
        }
      },
      formatter: function(name) {
        let i = 6
        if (name.length > i) {
          name = name.slice(0, i) + '..'
        }
        return `{a|${name}}`
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
    let offsetWidth = this.props.element ? Math.min(500, this.props.element.offsetWidth) : 300
    if (w <= 1475) {
      _minWidth = 0.55
      _maxWidth = 0.65
      _top = offsetWidth * _minWidth / 2 + 65
    } else if (w <= 2000) {
      _minWidth = 0.55
      _maxWidth = 0.65
      _top = offsetWidth * _minWidth / 2 + 5
    } else {
      _minWidth = 0.55
      _maxWidth = 0.65
      _top = offsetWidth * _minWidth / 2 + 65
    }
    option.legend.data = option.series[0].data.map(item => item.name).slice(0, window.innerWidth <= 1477 ? 6 : (window.innerWidth <= 1785 ? 12 : 20))
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