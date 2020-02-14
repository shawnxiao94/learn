/**
  * description: Icon组件
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React from 'react'
import { Tooltip } from 'antd'
import './index.less' // 已启用 CSS Modules

const SvgIcon = props => {
  const { iconClass, fill, titleName, isTooltip } = props
  if (isTooltip) {
    return (
      <Tooltip placement='bottomLeft' title={titleName}>
        <i aria-hidden='true' className='anticon'>
          <svg className='svg-class'>
            <use xlinkHref={'#icon-' + iconClass} fill={fill} />
          </svg>
        </i>
      </Tooltip>
    )
  } else {
    return (
      <i aria-hidden='true' className='anticon'>
        <svg className='svg-class'>
          <use xlinkHref={'#icon-' + iconClass} fill={fill} />
        </svg>
      </i>
    )
  }
}

SvgIcon.defaultProps = {
  fill: 'currentColor',
  isTooltip: false
}

export default SvgIcon