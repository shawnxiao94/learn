/**
  * description: 页面Loading
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { PureComponent } from 'react'
import { Spin } from 'antd'
class PageLoading extends PureComponent {
  render() {
    return (
      <div style={{
        'height': '100%',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }}
      >
        <Spin tip='Loading...' />
      </div>
    )
  }
}
export default PageLoading