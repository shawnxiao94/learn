/**
  * description: 全局图表组件 - 业务概览-业务趋势 卡槽
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import CardTabs from '@/components/UI/Card/CardTabs'
import Octopus from './Octopus/index'
import BusinessOverview from './BusinessOverview/index'
class UserDistribution extends Component {
  state = {
    tabs: [
      {
        key: 'ywgl',
        title: '业务概览'
      },
      {
        key: 'ywqs',
        title: '业务趋势'
      }
    ],
    activeKey: 'ywgl'
  }
  render() {
    return (
      <CardTabs
        tabs={this.state.tabs}
        onChange={activeKey => {
          this.setState({ activeKey })
        }}
        activeKey={this.state.activeKey}
        bordered={false}
        title='上汽用户分布'
      >
        {this.state.activeKey === 'ywgl' && <Octopus />}
        {this.state.activeKey === 'ywqs' && <BusinessOverview />}
      </CardTabs>
    )
  }
}
export default UserDistribution