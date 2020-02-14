/**
  * description: 标签详情组件-算法型标签子组件
  * author: Cathy
  * update: 注释 by Cathy 2019-09-06 15:00:00
  */
import React, { Component } from 'react'
import { Tag, Table } from 'antd'
import filters from '@/common/filters'
const { Column } = Table
class AlgorithmTypeDto extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let detailData = this.props.data
    let propsList = this.props.propsList
    return (
      <React.Fragment>
        <dl>
          <dt>标签名</dt>
          <dd>{detailData.tagDto.tagName}</dd>
        </dl>
        <dl>
          <dt>标签类型</dt>
          <dd className='c-ant-tag-theme-a'>
            <Tag color={filters.statusColor(2)}>
              {filters.tagTypeFilter(detailData.tagDto.tagType)}
            </Tag>
          </dd>
        </dl>
        <dl>
          <dt>标签类别</dt>
          <dd>{detailData.tagDto.categoryName}</dd>
        </dl>
        <dl>
          <dt>标签来源</dt>
          <dd>{detailData.tagDto.channelName}</dd>
        </dl>
        <dl>
          <dt>标签有效期</dt>
          <dd>{filters.parseDate(detailData.tagDto.effDate, 'YYYY-MM-DD')}~{filters.parseDate(detailData.tagDto.expDate, 'YYYY-MM-DD')}</dd>
        </dl>
        <dl>
          <dt>用户数</dt>
          <dd>{detailData.tagDto.clientTotals}</dd>
        </dl>
        <dl>
          <dt>标签状态</dt>
          <dd>
            <Tag
              color={filters.marketStatusFiltersBgColor(propsList.isOpen)}>
              {filters.statusFilters(propsList.isOpen)}
            </Tag>
          </dd>
        </dl>
        <dl>
          <dt>创建日期</dt>
          <dd>{filters.parseDate(detailData.tagDto.crtTime, 'YYYY-MM-DD')}</dd>
        </dl>
        <dl>
          <dt>分享渠道</dt>
          <dd className='c-ant-tag-theme-a'>
            {detailData.sourceDtos.length > 0 ? detailData.sourceDtos.map((item, index) => {
              return (
                <Tag color={filters.statusColor(1)} key={index}>{item.channelName}</Tag>
              )
            }) : '未共享'}
          </dd>
        </dl>
        <dl>
          <dt>标签说明</dt>
          <dd>{filters.empty(detailData.tagDto.tagDesc)}</dd>
        </dl>
        <Table
          dataSource={detailData.portraitDtos}
          rowKey={record => record.portraitId}
          size='middle'
          pagination={false}>
          <Column
            width='430'
            title='画像名'
            dataIndex='portraitName'
            key='portraitName'
          />
          <Column
            width='420'
            title='画像状态'
            dataIndex='status'
            key='status'
            render={values => (
              <Tag
                color={filters.marketStatusFiltersBgColor(values)}
              >
                {filters.statusFilters(values)}
              </Tag>
            )}
          />
        </Table>
      </React.Fragment>
    )
  }
}
export default AlgorithmTypeDto