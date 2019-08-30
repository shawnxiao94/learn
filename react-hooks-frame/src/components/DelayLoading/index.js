/** Loading组件 用于按需加载时过渡显示等 **/
import React from 'react'
import './index.css'
import { Spin } from 'antd'
const DelayLoading = () => {
  return (
    <div className="loading">
      <Spin tip="Loading..." size="large" >
      </Spin>
    </div>
  )
}

export default DelayLoading
