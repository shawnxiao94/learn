/**
  * description: 搜索模块统一
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import './index.less'

class SearchBar extends Component {
  componentDidUpdate() {
  }

  componentWillReceiveProps() {
  }

  render() {
    return (
      <div className={'search-bar ' + (this.props.className ? this.props.className : '')}>
        {this.props.children}
      </div>
    )
  }
}

export default SearchBar
