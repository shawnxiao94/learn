/**
 * UI要求Tooltip样式
 */
import React, { Component } from 'react'
import { Tooltip, Icon } from 'antd'
// import SvgIcon from '@/components/SvgIcon'
class TooltipCustom extends Component {
  render() {
    let dom = <div style={{ padding: '8px' }}>
      <Icon style={{ color: '#DC283E', 'margin-right': '10px' }} type='exclamation-circle' />
      {this.props.title}
    </div>
    return (
      <Tooltip
        title={this.props.title ? dom : undefined}
        destroyTooltipOnHide={this.props.destroyTooltipOnHide}
      >
        {this.props.children}
      </Tooltip>
    )
  }
}

export default TooltipCustom
