/**
  * description: 营销活动趋势
  */
import React, { Component } from 'react'
import { Card, Spin } from 'antd'
import Chart from './Chart'
class ActivityConversionAnalysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.getData(nextProps.data)
    }
  }

  /**
   * 重置
   */
  resetData() {
    let reset = {
      touchNumber: [
        { data: '暂无数据', value: 0 }
      ]
    }
    this.setState({ 'data': reset })
  }

  /**
   * 获取数据
   */
  getData(nextPropsData) {
    let propsData = nextPropsData || this.props.data || {}
    if (propsData.touchNumber && propsData.touchNumber.length) {
      this.setState({ data: propsData })
    } else {
      this.resetData()
    }
  }

  render() {
    return (
      <Card bordered={false} title='用户数分析'>
        <Spin spinning={this.props.loading}>
          <div style={{ 'height': '390px', position: 'relative', 'margin': '-5px auto 0' }}>
            <Chart data={this.state.data} />
          </div>
        </Spin>
      </Card>
    )
  }
}
export default ActivityConversionAnalysis