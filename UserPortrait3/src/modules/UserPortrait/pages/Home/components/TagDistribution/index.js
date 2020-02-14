/**
  * description: 上汽用户业务分布
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Card, Radio, message, Spin } from 'antd'
import PieCharts from './PieCharts'
import * as api from '@/modules/UserPortrait/data/api/Home/TagDistribution'
import './index.less'

class Octopus extends Component {
  state = {
    /**
     * 类型
     */
    type: 'userNum',
    /**
     * 图表数据
     */
    data: [],
    /**
     * 总量
     */
    count: 0,
    /**
     * 总量名称
     */
    countName: '用户数',
    /**
     * loading加载
     */
    loading: true
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getData()
  }
  /**
   * 业务分布切换
   */
  onChangeData = e => {
    this.setState({
      type: e.target.value
    })
    this.getData()
  };
  /**
   * 重置
   */
  resetData() {
    let reset = [
      { name: '集团', value: 0 },
      { name: '环球车享', value: 0 },
      { name: '乘用车', value: 0 },
      { name: '车享家', value: 0 },
      { name: '大通', value: 0 },
      { name: '享道', value: 0 }
    ]
    this.setState({ 'data': reset })
    this.setState({ 'count': 0 })
  }
  /**
   * 获取业务用户占比
   */
  getData() {
    this.resetData()
    this.setState({ 'loading': true })
    api.getBusinessPercent().then(res => {
      // 用户数
      if (this.state.type === 'userNum') {
        this.setState({ 'data': res.userBusiness.userDistributes })
        this.setState({ 'count': res.userBusiness.count })
        this.setState({ 'countName': '用户数' })
      }
      // 画像数
      if (this.state.type === 'portraitNum') {
        this.setState({ 'data': res.portraitBusiness.portraitDistributes })
        this.setState({ 'count': res.portraitBusiness.count })
        this.setState({ 'countName': '画像数' })
      }
      // 标签数
      if (this.state.type === 'labelNum') {
        this.setState({ 'data': res.tagBusiness.tagDistributes })
        this.setState({ 'count': res.tagBusiness.count })
        this.setState({ 'countName': '标签数' })
      }
    }).catch(() => {
      message.error('获取业务用户占比失败!')
    })
      .finally(() => {
        this.setState({ 'loading': false })
      })
  }
  render() {
    return (
      <Card bordered={false} title='上汽用户业务占比' className='home-piechart'>
        <div style={{ 'text-align': 'center', 'justify-content': 'space-between' }}>
          <Radio.Group onChange={this.onChangeData} value={this.state.type}>
            <Radio.Button value='userNum'>用户数</Radio.Button>
            <Radio.Button value='portraitNum'>画像数</Radio.Button>
            <Radio.Button value='labelNum'>标签数</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ 'padding-top': '20px' }} >
          <Spin spinning={this.state.loading}>
            <div ref={ref => { this.element = ref }} style={{ 'height': '413px', position: 'relative', 'max-width': '400px', 'margin': 'auto' }}>
              {!this.state.loading && <PieCharts element={this.element} data={this.state.data} countName={this.state.countName} count={this.state.count} />}
            </div>
          </Spin>
        </div>
      </Card>
    )
  }
}
export default Octopus
