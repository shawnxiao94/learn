import React, { Component } from 'react'
import Search from './components/Search'
import TableList from './components/TableList'
import RouteCrumb from '@/components/RouteCrumb'
import SubRoute from './route'
import routers from './route/config'
import * as api from '@/data/api/common'
class List extends Component {
    state = {
        data: []
    };
    /**
     * 兼容缓存写法，不存在缓存的情况可以不写
     */
    componentDidMount() {
        this.props.ensureDidMount && this.props.ensureDidMount()
    }
    
    componentWillMount() {
        this.getData()
    }

    /**
     * 调用API接口获取数据
     */
    getData() {
        api.test().then(response => {
            this.setState({ data: response })
        }).catch()
    }

    render() {
        return (
            <div>
                <RouteCrumb routes={routers} firstRoute={{ key: '/list/index', title: '列表' }} />
                <div style={{ 'display': (this.props.location.pathname !== '/list/index') ? 'none' : 'block' }}>
                    <Search />
                    <TableList data={this.state.data} />
                </div>
                <SubRoute />
            </div>
        )
    }
}
export default List