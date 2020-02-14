/**
  * description: 活动管理列表数据
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { PureComponent } from 'react'
import TableGroup from '@/components/UI/TableGroup'
import filters from '@/common/filters'
import { Table, Tag } from 'antd'
import ActivityButton from '@/modules/UserPortrait/pages/ActivityManage/components/Button/index.js'
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
          scroll={{ x: 1050 }}
        >
          <Column title='活动名称' width='220px' dataIndex='markName' key='markName' />
          <Column
            title='营销渠道'
            dataIndex='markChannel'
            key='markChannel' render={
              values => (
                values.map((val, index) => {
                  if (values.length - 1 !== index) {
                    return filters.marketChannelFilter(val) + ','
                  } else {
                    return filters.marketChannelFilter(val) + ''
                  }
                })
              )
            }
          />
          <Column title='状态' width='105px' dataIndex='status' key='status'
            render={values => (
              <div className='c-ant-tag--medium'>
                <Tag
                  color={filters.marketStatusFiltersBgColor(values)}
                >
                  {filters.marketStatusFilters(values)}
                </Tag>
              </div>
            )}
          />
          <Column
            title='生效日期'
            width='120px'
            dataIndex='markStartTime'
            key='markStartTime'
            render={values => (
              filters.parseDate(values, 'YYYY-MM-DD')
            )}
          />
          <Column
            sorter={true}
            title='失效日期'
            width='120px'
            dataIndex='markEndTime'
            key='markEndTime'
            render={values => (
              filters.parseDate(values, 'YYYY-MM-DD')
            )}
          />
          <Column title='用户总数' dataIndex='clientTotals' width='120px' key='clientTotals' />
          <Column
            title='操作'
            key='action'
            width='180px'
            fixed='right'
            render={tags => (
              <ActivityButton data={tags} />
            )}
          />
        </Table>
      </TableGroup>
    )
  }
}
export default List