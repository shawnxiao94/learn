/**
  * description: 标签管理主体 卡槽
  * author: Emma
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Card, Icon } from 'antd'
import LableTable from './List/index.js'
import { Link } from 'react-router-dom'

class Label extends Component {
  render() {
    // 标签管理列表 导航信息
    let _extra = (
      <React.Fragment>
        {/*
        <span>
          <Link to={{ pathname: '/label-manage/add' }}><Icon type='file-add' /></Link>
        </span>
         */}
        <span style={{ 'margin-left': '15px' }}>
          <Link to={'/label-manage'}><Icon type='menu' /></Link>
        </span>
      </React.Fragment>
    )
    return (
      <Card title='标签管理列表' bordered={false} extra={_extra} >
        <div style={{ 'height': '350px' }}>
          <LableTable />
        </div>
      </Card>
    )
  }
}
export default Label