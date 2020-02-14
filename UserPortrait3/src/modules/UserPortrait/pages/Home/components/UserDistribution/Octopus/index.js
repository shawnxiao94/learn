/**
  * description: 全局图表组件 - 业务概览水波图
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import Wave from './wave'
import { message, Spin } from 'antd'
import * as api from '@/modules/UserPortrait/data/api/Home/UserDistribution'
class Octopus extends Component {
  state = {
    data: [],
    loading: true
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getData()
  }
  /**
   * 获取图表数据
   */
  getData() {
    this.setState({ 'loading': true })
    this.resetData()
    api.businessOverview().then(data => {
      this.setState({ data: data })
    }).catch(() => {
      message.error('!')
    })
      .finally(() => {
        this.setState({ 'loading': false })
      })
  }
  /**
   * 初始化数据
   */
  resetData() {
    let _reset = {
      channelTotalList: [],
      userTotal: 0,
      max: 1
    }
    this.setState({ data: _reset })
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <div style={{ height: '340px' }}>
          {!this.state.loading && <Wave data={this.state.data} />}
        </div>
      </Spin>
    )
  }
}
export default Octopus
