import React, { Component } from 'react'
import { Card, message, Tag, Spin } from 'antd'
import { findByPortraitId } from '@/modules/UserPortrait/data/api/PortraitManage/Detail'
import filters from '@/common/filters'

class Detail extends Component {
  constructor(props) {
    super(props)
    let id = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    this.state = {
      loading: false,
      // 详情data
      data: {
        tags: []
      },
      form: {
        // 画像ID
        id: id
      }
    }
    // 获取画像详情接口数据
    this.getPortraitDetail = this.getPortraitDetail.bind(this)
  }

  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getPortraitDetail()
  }
  
  /**
   * 获取画像详情接口数据
   */
  getPortraitDetail() {
    this.setState({ 'loading': true })
    findByPortraitId(this.state.form).then(res => {
      this.setState({ 'data': res })
    }).catch(() => {
      message.error('获取画像详情失败!')
    }).finally(() => {
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
              <dt>画像名称</dt>
              <dd>{_data.portraitName}</dd>
            </dl>
            <dl>
              <dt>画像说明</dt>
              <dd>{filters.empty(_data.description)}</dd>
            </dl>
            <dl>
              <dt>画像有效期</dt>
              <dd>{_data.effDate}~{_data.expDate}</dd>
            </dl>
            <dl>
              <dt>画像来源</dt>
              <dd>{_data.channelName}</dd>
            </dl>
            <dl>
              <dt>画像状态</dt>
              <dd className='c-ant-tag-theme-a'>
                <Tag
                  color={filters.marketStatusFiltersBgColor(_data.status)}>
                  {filters.statusFilters(_data.status)}
                </Tag>
              </dd>
            </dl>
            <dl>
              <dt>画像标签</dt>
              <dd className='c-ant-tag-theme-a detail-tags-group'>
                {_data.tags.length > 0 ? _data.tags.map((item, index) => {
                  return (
                    <Tag color={filters.statusColor(1)} key={index}>{item.tagName}</Tag>
                  )
                }) : '未关联标签'}
              </dd>
            </dl>
          </div>
        </Spin>
      </Card>
    )
  }
}
export default Detail