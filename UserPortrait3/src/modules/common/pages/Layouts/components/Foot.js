/**
  * description: 页面底部
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Layout } from 'antd'
const { Footer } = Layout
class Foot extends Component {
  render() {
    return (
      <Footer style={{ 'text-align': 'center' }}>CopyRights 2018 SAIC Motor Corporation Limited</Footer>
    )
  }
}
export default Foot