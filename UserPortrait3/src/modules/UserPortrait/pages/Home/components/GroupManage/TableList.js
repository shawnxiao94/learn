/**
  * description: 用户群管理 - 列表
  * author: William
  */
import React, { PureComponent } from 'react'
import TableGroup from '@/components/UI/TableGroup'
import filters from '@/common/filters'
import { Table, Tag } from 'antd'
import Button from '@/modules/UserPortrait/pages/GroupManage/components/Button'
const { Column } = Table
class List extends PureComponent {
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
          defaultExpandedRowKeys={this.props.defaultExpandedRowKeys}
          rowKey={record => record.id}
          dataSource={this.props.data.content}
          loading={this.props.loading}
          pagination={this.props.data.pagination}
          onChange={this.handleTableChange.bind(this)}
        >
          <Column title='用户群名称' dataIndex='name' key='name' />
          <Column title='来源' dataIndex='channelName' key='channelName' />
          <Column title='状态' dataIndex='status' key='status'
            render={values => (
              <div className='c-ant-tag--medium'>
                <Tag color={filters.marketStatusFiltersBgColor(values)}>
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
          <Column title='用户总数' dataIndex='userCount' key='userCount'
            render={values => (
              filters.empty(values)
            )}
          />
          <Column
            title='操作'
            key='action'
            width='120px'
            render={row => (
              <Button row={row} />
            )}
          />
        </Table>
      </TableGroup>
    )
  }
}
export default List