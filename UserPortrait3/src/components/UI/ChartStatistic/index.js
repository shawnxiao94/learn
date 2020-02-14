/**
  * description: 全局静态图表组件
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Card, Statistic } from 'antd'
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
import './index.less'
// const { Text } = Typography
class ChartStatistic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.props.charts && this.setOption()
    }
  }
  setOption() {
    return objectMerge(deepClone(AXIS_OPTION), {
      xAxis: { show: false, boundaryGap: this.props.charts.type === 'bar' },
      yAxis: { show: false },
      grid: {
        top: '20',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: false
      },
      series: this.props.charts.type === 'bar' ? [
        {
          ...BAR_SERIES_STYLE,
          itemStyle: {
            normal: {
              color: this.props.charts.color || colors.c4
            }
          },
          name: this.props.title
        }
      ] : [
        {
          ...LINE_SERIES_STYLE,
          lineStyle: {
            normal: {
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: this.props.charts.color || colors.c1
            }
          },
          // areaStyle: {
          //     color: this.props.charts.color || colors.c1
          // },
          name: this.props.title
        }
      ]
    })
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.props.charts && this.setChartsData()
  }
  setChartsData() {
    let option = Object.assign({}, this.state.option)
    option.xAxis.data = this.props.charts.xAxisData
    option.series[0].data = this.props.charts.seriesData
    this.setState({ option })
  }
  render() {
    return (
      <Card className='w-chart-statistic' bordered={false}>
        <div className='w-chart-statistic-wrapper'>
          <div className='w-chart-statistic-lt'>
            <Statistic
              valueStyle={this.props.valueStyle}
              prefix={this.props.prefix}
              title={this.props.title}
              value={this.props.value}
              precision={this.props.precision}
              suffix={this.props.suffix}
            />
            {this.props.text && <div className='w-chart-statistic-text'>{this.props.text}</div>}
          </div>
          <div className='w-chart-statistic-rt'>
            {this.props.charts && <div style={{ height: '60px' }}>
              <Chart option={this.state.option} />
            </div>}
          </div>
        </div>
      </Card>
    )
  }
}
export default ChartStatistic