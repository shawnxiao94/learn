import React, { Component } from 'react'
import Search from './components/Search'
import TableList from './components/TableList'
import RouteCrumb from '@/components/RouteCrumb'
import SubRoute from './route'
import routers from './route/config'
class List extends Component {
    componentDidMount() {
        this.props.ensureDidMount()
    }
    render() {
        return (
            <div>
                <RouteCrumb routes={routers} firstRoute={{ key: '/list/index', title: '列表' }} />
                <div style={{ 'display': (this.props.location.pathname !== '/list/index') ? 'none' : 'block' }}>
                    <Search />
                    <TableList />
                </div>
                <SubRoute />
            </div>
        )
    }
}
export default List