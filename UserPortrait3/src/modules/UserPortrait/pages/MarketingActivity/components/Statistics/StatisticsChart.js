/**
  * description: 营销活动统计柱状图 - 图表
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import ChartCustom from '@/components/Chart/Custom'
import { objectMerge, deepClone } from '@/common/utils/index'
import { withRouter } from 'react-router-dom'
/**
 * 节流
 */
import { throttle } from 'throttle-debounce'
@withRouter
class StatisticsChart extends Component {
  constructor(props) {
    super(props)
    this.barGrain = null
    /**
     * 节流图表resize事件，声明公用变量方便注册和销毁
     */
    this.throttleFunction = throttle(100, this.resize)
  }
  initChart() {
    this.barGrain = new ChartCustom(document.getElementById('barGrain'))
  }
  /**
   * 营销活动统计图表
   */
  setupOptions(options = {}) {
    this.barGrain.setupOptions(objectMerge({
      xAxis: {
        data: this.props.data.map(item => item.label)
      },
      series: [
        {
          type: 'barGrain',
          splitNumber: 18,
          splitOffset: 9,
          data: this.props.data.map(item => item.value)
        }
      ],
      grid: {
        top: '3%',
        left: '5%',
        right: '2%',
        bottom: '7%'
      }
    }, deepClone(options)))
  }
  componentDidMount() {
    this.initChart()
    this.setupOptions()
    /**
     * 监听屏幕缩放，重新绘制 echart 图表
     */
    window.addEventListener('resize', this.throttleFunction)
  }
  componentWillUnmount() {
    /**
     * 组件卸载前卸载图表
     */
    this.dispose()
  }
  dispose = () => {
    this.barGrain = null
    window.removeEventListener('resize', this.throttleFunction)
    this.throttleFunction.cancel()
  };
  resize = () => {
    this.barGrain && this.barGrain.resize()
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname !== '/marketing-activity') {
      this.barGrain.clear()
    }
  }
  render() {
    return (
      <div style={{ 'height': '348px' }} id='barGrain'></div>
    )
  }
}
export default StatisticsChart