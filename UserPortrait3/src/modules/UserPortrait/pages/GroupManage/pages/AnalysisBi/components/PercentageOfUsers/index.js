/**
 * description: 用户数 占比
 * author: William
 */
import React, { Component } from 'react'
import { Card, Spin } from 'antd'
import PieCharts from './PieCharts'
 
class PercentageOfUsers extends Component {
  state = {
    /**
    * 图表数据
    */
    data: [],
    /**
    * loading加载
    */
    loading: true,
    /**
    * 总数
    */
    count: 0
  }
  /**
  * 在第一次渲染后调用
  */
  componentDidMount() {
    //  this.getData()
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.getData(nextProps.data)
    }
    if (this.props.loading !== nextProps.loading) {
      this.setState({ loading: nextProps.loading })
    }
  }
  /**
  * 重置
  */
  resetData() {
    let reset = [
    ]
    this.setState({ 'data': reset, 'count': '暂无数据', 'loading': false })
  }

  getData(nextPropsData) {
    let propsData = nextPropsData || this.props.data || {}
    if (propsData.chart && propsData.chart.length) {
      let data
      data = propsData.chart.map(item => {
        return {
          name: item.department,
          value: item.num
        }
      })
      this.setState({ data, count: propsData.userGroupCount })
    } else {
      this.resetData()
    }
  }

  render() {
    return (
      <Card bordered={false} title='用户数占比'>
        <div>
          <Spin spinning={this.state.loading}>
            <div ref={ref => { this.element = ref }} style={{ 'height': '380px', position: 'relative', 'margin': 'auto' }}>
              <PieCharts
                element={this.element}
                data={this.state.data}
                count={this.state.count}
              />
            </div>
          </Spin>
        </div>
      </Card>
    )
  }
}
export default PercentageOfUsers
 