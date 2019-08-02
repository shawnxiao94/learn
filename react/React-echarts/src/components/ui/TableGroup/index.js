import React, { Component } from 'react'
import './index.less'

class TableGroup extends Component {
    componentDidUpdate() {
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div className='table-group'>
                {this.props.children}
            </div>
        )
    }
}

export default TableGroup
