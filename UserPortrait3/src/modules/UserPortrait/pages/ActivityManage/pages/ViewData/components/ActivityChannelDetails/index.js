/**
  * description: 活动渠道详情
  */
import React, { Component } from 'react'
import TableGroup from '@/components/UI/TableGroup'
import { Table, Card } from 'antd'
import * as filters from '@/common/filters/status'
import ProgressBar from '@/components/Chart/ProgressBar'
const { Column } = Table
class ActivityChannelDetails extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Card bordered={false} title='活动渠道详情'>
        <TableGroup>
          <Table
            rowKey={record => record.channelType}
            dataSource={this.props.data}
            loading={this.props.loading}
            pagination={false}
          >
            <Column
              title='营销渠道'
              key='channelType'
              render={values => (
                filters.marketChannelFilter(values.channelType)
              )}
            />
            <Column
              title='触达数'
              dataIndex='touchNumber'
              key='touchNumber'
            />
            <Column
              title='点击数'
              dataIndex='clickNumber'
              key='clickNumber'
            />
            <Column
              title='到店数'
              dataIndex='shopNumber'
              key='shopNumber'
            />
            <Column
              title='成交数'
              dataIndex='fixtureNumber'
              key='fixtureNumber'
            />
            <Column
              title='转换率'
              key='action'
              width='160px'
              render={values => (
                <ProgressBar value={parseInt(Math.random() * 100) + '%'} />
              )}
            />
          </Table>
        </TableGroup>
      </Card>
    )
  }
}
export default ActivityChannelDetails