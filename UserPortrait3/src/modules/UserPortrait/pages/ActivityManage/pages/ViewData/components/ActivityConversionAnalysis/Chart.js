import React, { Component } from 'react'
import { objectMerge, deepClone } from '@/common/utils/index'
/**
 * 全局图表组件
 */
import Chart from '@/components/Chart'
import { AXIS_OPTION, LINE_SERIES_STYLE_2, TOOLTIP_FORMATTER_STYLE } from '@/components/Chart/options'
/*
 * JS动态色系
 */
import colors from '@/assets/styles/color/color.js'

class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.setOption()
    }
  }
  setOption() {
    return objectMerge(deepClone(AXIS_OPTION), {
      grid: {
        top: '9.5%',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true
      },
      tooltip: {
        ...TOOLTIP_FORMATTER_STYLE
      },
      legend: {
        data: ['触达数', '点击数', '到店数', '成交数']
      },
      axisPointer: {
        z: 2
      },
      xAxis: {
        boundaryGap: true
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          ...LINE_SERIES_STYLE_2,
          name: '触达数',
          code: 'touchNumber',
          itemStyle: {
            normal: {
              color: colors.c4
            }
          },
          areaStyle: {
            color: '#2C2F61'
          }
        },
        {
          ...LINE_SERIES_STYLE_2,
          name: '点击数',
          code: 'clickNumber',
          itemStyle: {
            normal: {
              color: colors.c1
            }
          },
          areaStyle: {
            color: '#17395B'
          }
        },
        {
          ...LINE_SERIES_STYLE_2,
          name: '到店数',
          code: 'toShopNumber',
          itemStyle: {
            normal: {
              color: colors.c8
            }
          },
          areaStyle: {
            color: '#154650'
          }
        },
        {
          ...LINE_SERIES_STYLE_2,
          name: '成交数',
          code: 'fixtureNumber',
          itemStyle: {
            normal: {
              color: colors.c3
            }
          },
          areaStyle: {
            color: '#18493D'
          }
        }
      ]
    })
  }

  componentDidMount() {
    this.setChartsData()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setChartsData(nextProps.data)
    }
  }

  setChartsData(nextPropsData) {
    let data = nextPropsData || this.props.data || {}
    if (data.touchNumber) {
      let option = Object.assign({}, this.state.option)
      option.xAxis.data = data.touchNumber.map(item => item.data)
      option.series.forEach(item => {
        item.data = data[item.code] && data[item.code].map(item => item.value)
      })
      this.setState({ option })
    }
  }
  render() {
    return (
      <Chart option={this.state.option} />
    )
  }
}
export default LineChart