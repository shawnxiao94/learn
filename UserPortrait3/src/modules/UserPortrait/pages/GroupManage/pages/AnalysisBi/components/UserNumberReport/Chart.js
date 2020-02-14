import React, { Component } from 'react'
import { objectMerge, deepClone } from '@/common/utils/index'
/**
 * 全局图表组件
 */
import Chart from '@/components/Chart'
import { AXIS_OPTION, BAR_SERIES_STYLE } from '@/components/Chart/options'
/*
 * JS动态色系
 */
import colors from '@/assets/styles/color/color.js'

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: this.setOption()
    }
  }
  setOption() {
    return objectMerge(deepClone(AXIS_OPTION), {
      legend: {
        show: false
      },
      grid: {
        top: '10%',
        left: '2%',
        right: '2%',
        bottom: '12%',
        containLabel: true
      },
      tooltip: {
        axisPointer: {
          z: 0,
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0,0,0,.1)'
          }
        },
        formatter(params) {
          let dom = params.map(item => {
            return `
              <div>
                <span style="display:inline-block;vertical-align:middle;margin-right:5px;border-radius:100%;width:6px;height:6px;background-color:${item.color};"></span>
                <span style="color:${colors.gray.colorGrayOtherA}">
                  ${item.name}
                </span> 
                <span style="margin-left:5px;color:${colors.gray.colorGraySSSS}">
                  ${item.value}
                </span>
              </div>
            `
          })
          return dom
        }
      },
      dataZoom: [
        {
          type: 'inside',
          minValueSpan: 2
        },
        {
          show: true,
          type: 'slider',
          height: '26px',
          backgroundColor: '#24262C',
          fillerColor: '#24262C',
          borderColor: 'rgba(0,0,0,.1)',
          handleStyle: {
            color: 'rgba(255,255,255,.2)'
          },
          minValueSpan: 2
        }
      ],
      xAxis: {
        boundaryGap: true
      },
      yAxis: {
        name: '人数',
        nameTextStyle: {
          color: 'rgba(241,242,243,0.45)',
          fontSize: 14,
          padding: [0, 44, 0, 0]
        },
        minInterval: 10
      },
      series: [
        {
          name: '人数',
          ...BAR_SERIES_STYLE,
          itemStyle: {
            normal: {
              color: colors.c1
            }
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
    let data = nextPropsData || this.props.data || []
    let option = Object.assign({}, this.state.option)
    option.xAxis.data = data.map(item => item.name)
    option.series[0].data = data.map(item => item.value)
    this.setState({ option })
  }
  render() {
    return (
      <Chart option={this.state.option} />
    )
  }
}
export default BarChart