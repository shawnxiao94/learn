import React, { Component } from 'react'
import TableGroup from '@/components/ui/TableGroup'
import filters from '@/common/filters'
import { Table, Tag } from 'antd'
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        /* eslint-disable */
        render: values => (
            <Tag>{filters.statusFilters(values)}</Tag>
        )
        /* eslint-enable */
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
    }
]
class List extends Component {
    
    render() {
        return (
            <TableGroup>
                <Table dataSource={this.props.data} columns={columns} />
            </TableGroup>
        )
    }
}
export default List