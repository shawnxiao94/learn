/**
  * description: 活动管理 - 详情
  * author: Emma
  */
import React, { Component } from 'react'
import { Card, message, Spin, Tag } from 'antd'
import * as api from '@/modules/UserPortrait/data/api/ActivityManage'
import filters from '@/common/filters'

class Detail extends Component {
  constructor(props) {
    super(props)
    let { params } = window.getRouterParams(this.props.location.pathname, '/activity-manage/detail/:id')
    this.state = {
      id: params.id,
      loading: false,
      data: {
        userGroupName: [],
        markChannelList: []
      }
    }
    // 获取活动详情接口数据
    this.getActivityDetail = this.getActivityDetail.bind(this)
  }
 
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getActivityDetail()
  }
  
  /**
   * 获取活动详情接口数据
   */
  getActivityDetail() {
    this.setState({ 'loading': true })
    api
      .queryParentActivityById({ actId: this.state.id })
      .then(res => {
        this.setState({ 'data': res })
      })
      .catch(() => {
        message.error('获取活动详情失败!')
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
              <dt>营销名称</dt>
              <dd>{filters.empty(_data.markName)}</dd>
            </dl>
            <dl>
              <dt>活动发起方</dt>
              <dd>{filters.channelFilters(_data.activeInitiator)}</dd>
            </dl>
            <dl>
              <dt>活动响应方</dt>
              <dd className='c-ant-tag-theme-a detail-tags-group'>
                <Tag color={filters.statusColor(1)} >{filters.channelFilters(_data.activeResponderList)}</Tag>
              </dd>
            </dl>
            <dl>
              <dt>关联的用户群</dt>
              <dd className='c-ant-tag-theme-a detail-tags-group'>
                {
                  _data.userGroupName && _data.userGroupName.length > 0 ? _data.userGroupName.map((item, index) => {
                    return (
                      <Tag color={filters.statusColor(1)} key={index}>{item.name}</Tag>
                    )
                  }) : '未关联用户群'
                }
              </dd>
            </dl>
            <dl>
              <dt>营销渠道</dt>
              <dd className='c-ant-tag-theme-a detail-tags-group'>
                {
                  _data.markChannelList.length > 0 ? _data.markChannelList.map((item, index) => {
                    return (
                      <Tag color={filters.statusColor(1)} key={index}>{filters.marketChannelFilter(item)}</Tag>
                    )
                  }) : '未关联营销渠道'
                }
              </dd>
            </dl>
            <dl>
              <dt>状态</dt>
              <dd className='c-ant-tag-theme-a'>
                <Tag
                  color={filters.marketStatusFiltersBgColor(_data.status)}>
                  {filters.marketStatusFilters(_data.status)}
                </Tag>
              </dd>
            </dl>
            <dl>
              <dt>文件生成路径</dt>
              <dd>
                {
                  (_data.filePath && _data.filePath.length > 0) ? _data.filePath.map((item, index) => {
                    return (
                      <span key={index} style={{ display: 'block' }}>
                        {item}
                      </span>
                    )
                  }) : '-'
                }
              </dd>
            </dl>
            <dl>
              <dt>营销有效期</dt>
              <dd>{filters.parseDate(_data.markStartTime, 'YYYY-MM-DD')}~{filters.parseDate(_data.markEndTime, 'YYYY-MM-DD')}</dd>
            </dl>
            <dl>
              <dt>用户总数</dt>
              <dd>{filters.empty(_data.userCounts)}</dd>
            </dl>
            <dl>
              <dt>创建人</dt>
              <dd>{filters.empty(_data.createBy)}</dd>
            </dl>
            <dl>
              <dt>创建日期</dt>
              <dd>{filters.parseDate(_data.createTime, 'YYYY-MM-DD')}</dd>
            </dl>
            <dl>
              <dt>备注</dt>
              <dd>{filters.empty(_data.remark)}</dd>
            </dl>
          </div>
        </Spin>
      </Card>
    )
  }
}
export default Detail