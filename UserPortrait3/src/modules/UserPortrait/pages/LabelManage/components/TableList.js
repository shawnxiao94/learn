import React, { Component } from 'react'
import TableGroup from '@/components/UI/TableGroup'
import LabelButton from './Button/index.js'
import filters from '@/common/filters'
import { Table, Tag } from 'antd'
const { Column } = Table
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  /**
   * 表格相应变化
   */
  handleTableChange(pagination, filters, sorter) {
    this.props.handleTableChange(pagination, filters, sorter)
  }
  render() {
    return (
      <TableGroup>
        <Table
          dataSource={this.props.data.content}
          rowKey={record => record.id}
          loading={this.props.loading}
          pagination={this.props.data.pagination}
          onChange={this.handleTableChange.bind(this)}
        >
          <Column title='标签名称' dataIndex='label' key='label' />
          <Column
            title='类型'
            dataIndex='tagType'
            key='tagType'
            render={values => (
              <div className='c-ant-tag-theme-a'>
                <Tag color={filters.statusColor(2)} >{filters.tagTypeFilter(values)}</Tag>
              </div>
            )}
          />
          <Column title='标签来源' dataIndex='channelName' key='channelName' />
          <Column
            title='用户数'
            dataIndex='clientTotals'
            key='clientTotals'
          />
          <Column
            title='状态'
            dataIndex='isOpen'
            key='isOpen'
            render={values => (
              <div className='c-ant-tag--medium'>
                <Tag
                  color={filters.marketStatusFiltersBgColor(values)}
                >
                  {filters.statusFilters(values)}
                </Tag>
              </div>
            )}
          />
          <Column
            sorter={true}
            title='生效日期'
            dataIndex='effDate'
            key='effDate'
            render={values => (
              filters.parseDate(values, 'YYYY-MM-DD')
            )}
          />
          <Column
            sorter={true}
            title='失效日期'
            dataIndex='expDate'
            key='expDate'
            render={values => (
              filters.parseDate(values, 'YYYY-MM-DD')
            )}
          />
          <Column
            fixed='right'
            title='操作'
            width='150px'
            key='action'
            render={tags => (
              <LabelButton data={tags} key={Math.random()} />
            )}
          />
        </Table>
      </TableGroup>
    )
  }
}
export default List