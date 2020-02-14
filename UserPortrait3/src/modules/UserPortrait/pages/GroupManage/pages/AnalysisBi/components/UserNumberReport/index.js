/**
 * description: 用户数 报表
 * author: William
 */
import React, { PureComponent } from 'react'
import Chart from './Chart'
import { Card, Spin } from 'antd'
class UserNumberReport extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // loading
      loading: false,
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
    if (this.props.loading !== nextProps.loading) {
      this.setState({ loading: nextProps.loading })
    }
  }

  /**
   * 重置
   */
  resetData() {
    let reset = [
      { name: '暂无数据', value: 0 }
    ]
    this.setState({ 'data': reset })
  }

  /**
   * 获取数据
   */
  getData(nextPropsData) {
    let propsData = nextPropsData || this.props.data || {}
    if (propsData.chart && propsData.chart.length) {
      let data = propsData.chart.map(item => {
        return {
          name: item.department,
          value: item.num
        }
      })
      this.setState({ data })
    } else {
      this.resetData()
    }
  }

  render() {
    return (
      <Card bordered={false} title='用户数分析'>
        <Spin spinning={this.state.loading}>
          <div style={{ 'height': '380px', position: 'relative' }}>
            <Chart data={this.state.data} />
          </div>
        </Spin>
      </Card>
    )
  }
}
export default UserNumberReport