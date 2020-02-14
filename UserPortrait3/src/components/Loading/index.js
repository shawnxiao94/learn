import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Spin } from 'antd'
import './index.less'

@withRouter
@inject('Root')
@observer
class Loading extends Component {
  componentDidUpdate() {
    if (this.props.Root.loading) {
      this.props.Root.setLoading(false)
    }
  }

  componentWillReceiveProps() {
    this.props.Root.setLoading(true)
  }

  render() {
    return (
      <Spin tip='页面加载中' wrapperClassName='loading-wrap' spinning={this.props.Root.loading}>
        {this.props.children}
      </Spin>
    )
  }
}

export default Loading
