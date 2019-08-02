import React, { Component } from 'react'
import TableGroup from '@/components/ui/TableGroup'
import { Link } from 'react-router-dom'
import filters from '@/common/filters'
import { Table, Button, Tag } from 'antd'
const { Column } = Table
class List extends Component {
    render() {
        return (
            <TableGroup>
                <Table dataSource={this.props.data} >
                    <Column title='姓名' dataIndex='name' key='name' />
                    <Column title='年龄' dataIndex='age' key='age' />
                    <Column title='住址' dataIndex='address' key='address' />
                    <Column title='状态' dataIndex='status' key='status'
                        render={values => (
                            <Tag>{filters.statusFilters(values)}</Tag>
                        )}
                    />
                    <Column
                        title='操作'
                        key='action'
                        render={tags => (
                            <Link to='/list/index/detail'>
                                <Button>点击查看详情</Button>
                            </Link>
                        )}
                    />
                </Table>
            </TableGroup>
        )
    }
}
export default List