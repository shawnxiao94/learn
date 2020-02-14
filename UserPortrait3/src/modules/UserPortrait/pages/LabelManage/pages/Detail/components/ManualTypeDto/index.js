/**
  * description: 标签详情组件-手工型标签子组件
  * author: Cathy
  * update: 注释 by Cathy 2019-09-06 15:00:00
  */
import React, { Component } from 'react'
import { Tag, Table, message } from 'antd'
import { queryManualTagRecord } from '@/modules/UserPortrait/data/api/LabelManage/Detail'
import filters from '@/common/filters'
const { Column } = Table
class ManualTypeDto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 上传文件历史数据data
      data: null,
      form: {
        // 标签ID
        id: ''
      }
    }
  }
  /**
   * 初始化
   */
  componentDidMount() {
    this.queryManualTagRecord()
  }
  queryManualTagRecord() {
    // let _form = { id: '' }
    // _form.id = this.props.data.tagDto.id
    // this.setState({
    //   form: _form
    // })
    queryManualTagRecord(this.props.data.tagDto).then(res => {
      this.setState({ 'data': res.Result.data })
    }).catch(() => {
      message.error('获取用户导入明细失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  render() {
    let detailData = this.props.data
    let propsList = this.props.propsList
    let tagRecord = this.state.data
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
        <Table
          dataSource={this.state.data}
          rowKey={record => record.tagId}
          size='middle'
          pagination={false}>
          <Column
            title='导入时间'
            dataIndex='crtTime'
            key='crtTime'
          />
          <Column
            title='导入人'
            dataIndex='crtUser'
            key='crtUser'
          />
          <Column
            title='操作内容'
            dataIndex='category'
            key='category'
            render={values => (
              <div>
                {values === '1' ? <span>
                  {tagRecord && <span>
                    {tagRecord[0].category === '0' && <span>{`${filters.manualTagLogCategoryFilter(tagRecord[0].category)}总共上传 ${tagRecord[0].totalNum} 个用户，其中 ${tagRecord[0].cancelNum} 个用户的该标签已失效；`}</span>}
                    {tagRecord[0].category === '1' && <span>{`${filters.manualTagLogCategoryFilter(tagRecord[0].category)}总共上传 ${tagRecord[0].totalNum} 个用户，其中 ${tagRecord[0].successNum} 个用户已成功打上该标签；`}</span>}
                    {tagRecord[0].category === '2' && <span>{`${filters.manualTagLogCategoryFilter(tagRecord[0].category)}总共上传 ${tagRecord[0].totalNum} 个用户，其中新增了 ${tagRecord[0].increaseNum} 个用户，更新了 ${this.state.updateNum} 个用户`}</span>}
                  </span>}
                </span> : '-'}
              </div>
            )}
          />
          <Column
            title='状态'
            dataIndex='status'
            key='status'
            render={values => (
              <span>{filters.manualTagLogStatusFilter(values)}</span>
            )}
          />
        </Table>
      </React.Fragment>
    )
  }
}
export default ManualTypeDto