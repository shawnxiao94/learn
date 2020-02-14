/**
  * description: 画像管理列表页面-列表组件
  * author: Cathy
  * update: 注释 by Cathy 2019-09-09
  */
import React, { Component } from 'react'
import TableGroup from '@/components/UI/TableGroup'
import { Table, Tag } from 'antd'
import Button from './Button.js'
import filters from '@/common/filters'
const { Column } = Table

class TableList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
          rowKey={record => record.id}
          dataSource={this.props.data.content}
          pagination={this.props.data.pagination}
          onChange={this.handleTableChange.bind(this)}
        >
          <Column
            title='画像名称'
            dataIndex='portraitName'
            key='portraitName'
          />
          <Column
            title='画像来源'
            dataIndex='channelName'
            key='channelName'
          />
          <Column
            title='标签总数'
            dataIndex='tagSum'
            key='tagSum'
          />
          <Column
            title='用户数'
            dataIndex='userTotals'
            key='userTotals'
          />
          <Column
            title='状态'
            dataIndex='status'
            key='status'
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
            width='145px'
            key='action'
            render={tags => (
              <Button data={tags} />
            )}
          />
        </Table>
      </TableGroup>
    )
  }
}
export default TableList