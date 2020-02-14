/**
  * description: 标签详情组件
  * author: Cathy
  * update: 注释 by Cathy 2019-09-06 15:00:00
  */
import React, { Component } from 'react'
import { Card, message, Spin } from 'antd'
import { queryTagByTagId } from '@/modules/UserPortrait/data/api/Home/Label'
import StatisticalTypeDto from './components/StatisticalTypeDto/index'
import ManualTypeDto from './components/ManualTypeDto'
import AlgorithmTypeDto from './components/AlgorithmTypeDto'
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 详情data
      data: {},
      // 父组件list传递数据
      propsList: {},
      form: {
        // 标签ID
        id: ''
      },
      // 标签类型
      tagType: ''
    }
  }
  /**
   * 初始化
   */
  componentDidMount() {
    this.getTagDetail()
  }
  /**
   * 获取标签详情接口数据
   */
  getTagDetail() {
    let _form = this.state.form
    let _url = location.href.split('?')[1].split('&')
    let _propsList = {}
    _url.forEach(item => {
      _propsList[item.split('=')[0]] = item.split('=')[1]
    })
    _form.id = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    this.setState({
      propsList: _propsList,
      form: _form
    })
    this.setState({ 'loading': true })
    queryTagByTagId(this.state.form).then(res => {
      this.setState({ 'data': res.Result.data })
    }).catch(() => {
      message.error('获取标签详情失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  render() {
    let tagType = this.state.data.tagDto && this.state.data.tagDto.tagType
    return (
      <Card bordered={false}>
        <Spin spinning={this.state.loading}>
          <div style={{ 'width': '600px', 'margin': '0 auto' }} className='detail-layout'>
            {/* 统计型标签组件 */}
            {tagType === 'statistical' && this.state.data && <StatisticalTypeDto data={this.state.data} propsList={this.state.propsList} />}
            {/* 手工型标签组件 */}
            {tagType === 'manual' && this.state.data && <ManualTypeDto data={this.state.data} propsList={this.state.propsList} />}
            {/* 算法型标签组件 */}
            {tagType === 'algorithm' && this.state.data && <AlgorithmTypeDto data={this.state.data} propsList={this.state.propsList} />}
          </div>
        </Spin>
      </Card>
    )
  }
}
export default Detail