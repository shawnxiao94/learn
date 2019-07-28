import React, { Component } from 'react'
import Search from './components/Search'
import TableList from './components/TableList'
class Home extends Component {
    render() {
        return (
            <div>
                <Search />
                <TableList />
            </div>
        )
    }
}
export default Home