import React, { Component } from 'react'
import TableGroup from '@/components/ui/TableGroup'
import { Link } from 'react-router-dom'
import { Table, Button } from 'antd'
const { Column } = Table
const dataSource = [
    {
        key: '1',
        name: '列表名称',
        age: 2424,
        address: '西湖区湖底公园1号'
    },
    {
        key: '2',
        name: '列表名称B',
        age: 23,
        address: '西湖区湖底公园2号'
    },
    {
        key: '3',
        name: '列表名称C',
        age: 1212,
        address: '西湖区湖底公园3号'
    },
    {
        key: '4',
        name: '列表名称D',
        age: 76,
        address: '西湖区湖底公园4号'
    },
    {
        key: '5',
        name: '列表名称E',
        age: 5345,
        address: '西湖区湖底公园5号'
    },
    {
        key: '6',
        name: '列表名称F',
        age: 42,
        address: '西湖区湖底公园16号'
    }
]
class List extends Component {
    render() {
        return (
            <TableGroup>
                <Table dataSource={dataSource} >
                    <Column title='姓名' dataIndex='name' key='name' />
                    <Column title='年龄' dataIndex='age' key='age' />
                    <Column title='住址' dataIndex='address' key='address' />
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