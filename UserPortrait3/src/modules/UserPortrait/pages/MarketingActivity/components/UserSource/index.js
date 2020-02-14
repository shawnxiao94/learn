import React, { Component } from 'react'
import { Card, message, Spin } from 'antd'
import GraphCharts from './GraphCharts'
import * as api from '@/modules/UserPortrait/data/api/MarketingActivity/UserSource'

class UserSource extends Component {
  state = {
    /**
     * 图表数据
     */
    data: []
  }

  componentDidMount() {
    this.getData()
  }
  /**
   * 活动用户来源 - 关系图重置
   */
  resetData() {
  }
  /**
   * 获取活动用户来源数据
   */
  getData() {
    this.resetData()
    this.setState({ 'loading': true })
    api.queryActiveUserSource().then(response => {
      this.setState({ data: response })
    }).catch(() => {
      message.error('获取活动用户来源数据失败!')
    })
      .finally(() => {
        this.setState({ 'loading': false })
      })
  }
  render() {
    return (
      <Card bordered={false} title='活动用户来源'>
        <div>
          <Spin spinning={this.state.loading}>
            <div ref={ref => { this.element = ref }} style={{ 'height': '468px', position: 'relative', 'max-width': '400px', 'margin': 'auto' }}>
              {!this.state.loading && <GraphCharts element={this.element} data={this.state.data} />}
            </div>
          </Spin>
        </div>
      </Card>
    )
  }
}
export default UserSource
