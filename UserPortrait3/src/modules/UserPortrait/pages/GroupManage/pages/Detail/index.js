/**
  * description: 用户群详情
  * author: William
  */
import React, { Component } from 'react'
import { Card, message, Tag, Spin } from 'antd'
import * as api from '@/modules/UserPortrait/data/api/GroupManage'
import filters from '@/common/filters'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: (this.props.location.params && this.props.location.params.id) || this.props.match.params.id,
      loading: false,
      data: {}
    }
    // 获取用户群详情接口数据
    this.getGroupDetail = this.getGroupDetail.bind(this)
  }

  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getGroupDetail()
  }
  
  /**
   * 获取用户群详情接口数据
   */
  getGroupDetail() {
    this.setState({ 'loading': true })
    api
      .getGroupDetail({ userShareGroupId: this.state.id })
      .then(res => {
        this.setState({ 'data': res.Result.data })
      })
      .catch(() => {
        message.error('获取用户群详情失败!')
      })
      .finally(() => {
        this.setState({ 'loading': false })
      })
  }

  render() {
    let _data = this.state.data
    return (
      <Card bordered={false}>
        <Spin spinning={this.state.loading}>
          <div style={{ 'width': '600px', 'margin': '0 auto' }} className='detail-layout'>
            <dl>
              <dt>用户群名称</dt>
              <dd>{_data.name}</dd>
            </dl>
            <dl>
              <dt>用户群来源</dt>
              <dd>{_data.channelName}</dd>
            </dl>
            <dl>
              <dt>画像名称</dt>
              <dd>{filters.empty(_data.protraitName)}</dd>
            </dl>
            <dl>
              <dt>共享状态</dt>
              <dd className='c-ant-tag-theme-a'>
                <Tag
                  color={filters.marketStatusFiltersBgColor(_data.status)}>
                  {filters.statusFilters(_data.status)}
                </Tag>
              </dd>
            </dl>
            <dl>
              <dt>用户群有效期</dt>
              <dd>{filters.parseDate(_data.effDate, 'YYYY-MM-DD')}~{filters.parseDate(_data.expDate, 'YYYY-MM-DD')}</dd>
            </dl>
            <dl>
              <dt>用户总数</dt>
              <dd>{filters.empty(_data.userCounts)}</dd>
            </dl>
            <dl>
              <dt>创建人</dt>
              <dd>{_data.crtUser}</dd>
            </dl>
            <dl>
              <dt>创建日期</dt>
              <dd>{filters.parseDate(_data.crtTime, 'YYYY-MM-DD')}</dd>
            </dl>
            <dl>
              <dt>最后更新人</dt>
              <dd>{_data.updUser}</dd>
            </dl>
            <dl>
              <dt>最后更新日期</dt>
              <dd>{filters.parseDate(_data.updTime, 'YYYY-MM-DD')}</dd>
            </dl>
          </div>
        </Spin>
      </Card>
    )
  }
}
export default Detail