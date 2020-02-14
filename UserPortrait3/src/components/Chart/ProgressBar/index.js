/**
 * 进度条组件
 * @props {Number} value 进度
 */
import React, { PureComponent } from 'react'
import { formatFloat } from '@/common/utils'
import { Tooltip } from 'antd'
import './index.less'
export default class Chart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      width: 0
    }
  }

  /**
   * 获取准确百分比
   */
  getPercentage() {
    let value = this.props.value || 0
    if (value) {
      if (!String(value).includes('%')) {
        if (isNaN(+value)) {
          throw new TypeError('百分比必须为数字或者带%号的数字')
        }
        value = formatFloat(+value * 100) + '%'
      }
    }
    return value
  }

  render() {
    let percentage = this.getPercentage()
    return (
      <Tooltip title={percentage}>
        <div className='progress-bar' style={this.props.style}>
          <div className='progress-bar-fill' style={{ width: percentage }}></div>
        </div>
      </Tooltip>
    )
  }
}