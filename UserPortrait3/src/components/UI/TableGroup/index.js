/**
  * description: Table列表模块统一
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
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
