/**
  * description: 页面主体布局内容
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Layout } from 'antd'
import Loading from '@/components/Loading'
import { inject, observer } from 'mobx-react'
const { Content } = Layout
@inject('Permission')
@observer
class Main extends Component {
  render() {
    return (
      <Content style={{ margin: '16px 16px 0' }}>
        <Loading>
          <this.props.Router></this.props.Router>
        </Loading>
      </Content>
    )
  }
}
export default Main