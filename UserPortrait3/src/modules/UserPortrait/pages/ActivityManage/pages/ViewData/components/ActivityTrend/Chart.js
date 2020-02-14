import React, { Component } from 'react'
import { objectMerge, deepClone } from '@/common/utils/index'
/**
 * 全局图表组件
 */
import Chart from '@/components/Chart'
import { DEFAULT_OPTION, FUNNEL_SERIES_STYLE, TOOLTIP_FORMATTER_STYLE } from '@/components/Chart/options'
/*
 * JS动态色系
 */
// import colors from '@/assets/styles/color/color.js'

class FunnelChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.setOption()
    }
  }
  setOption() {
    return objectMerge(deepClone(DEFAULT_OPTION), {
      grid: {
        top: '8%',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true
      },
      tooltip: {
        ...TOOLTIP_FORMATTER_STYLE
      },
      series: [
        {
          ...FUNNEL_SERIES_STYLE
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
    let data = nextPropsData || this.props.data || []
    if (data) {
      let option = Object.assign({}, this.state.option)
      option.legend.data = data.map(item => item.name)
      option.series[0].data = data
      this.setState({ option })
    }
  }
  render() {
    return (
      <Chart option={this.state.option} />
    )
  }
}
export default FunnelChart