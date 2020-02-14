import React, { Component } from 'react'
import { Card, Statistic, Divider } from 'antd'
import { objectMerge, deepClone } from '@/common/utils/index'
/**
 * 全局图表组件
 */
import Chart from '@/components/Chart'
import { AXIS_OPTION, LINE_SERIES_STYLE, BAR_SERIES_STYLE } from '@/components/Chart/options'
/*
 * JS动态色系
 */
import colors from '@/assets/styles/color/color.js'
// const { Text } = Typography
class CardStatistic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.setOption()
    }
  }
  setOption() {
    return objectMerge(deepClone(AXIS_OPTION), {
      xAxis: { show: false, boundaryGap: this.props.chartsType === 'bar' },
      yAxis: { show: false },
      grid: {
        top: '20',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: false
      },
      series: this.props.chartsType === 'bar' ? [
        {
          ...BAR_SERIES_STYLE,
          itemStyle: {
            normal: {
              color: this.props.chartsColor || colors.c4
            }
          },
          name: this.props.title
        }
      ] : [
        {
          ...LINE_SERIES_STYLE,
          lineStyle: {
            normal: {
              width: 0
            }
          },
          areaStyle: {
            color: this.props.chartsColor || colors.c1
          },
          name: this.props.title
        }
      ]
    })
  }
  componentDidMount() {
    this.setChartsData()
  }
  setChartsData() {
    let option = Object.assign({}, this.state.option)
    option.xAxis.data = ['2019-07-29', '2019-07-30', '2019-07-31', '2019-08-01']
    option.series[0].data = [Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 200]
    this.setState({ option })
  }
  render() {
    return (
      <Card bordered={false}>
        <Statistic
          valueStyle={this.props.valueStyle}
          prefix={this.props.prefix}
          title={this.props.title}
          value={this.props.value}
          precision={this.props.precision}
        />
        <div style={{ height: '60px' }}>
          <Chart option={this.state.option} />
        </div>
        <Divider style={{ margin: '15px 0 6px' }} />
        {this.props.text}
      </Card>
    )
  }
}
export default CardStatistic