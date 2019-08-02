import React, { Component } from 'react'
import Search from './components/Search'
import TableList from './components/TableList'
import * as api from '@/data/api/common'
class Home extends Component {
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
                <Search />
                <TableList data={this.state.data} />
            </div>
        )
    }
}
export default Home