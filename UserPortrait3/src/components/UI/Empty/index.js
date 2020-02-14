/**
 * 全局空置组件
 */
import React from 'react'
import SvgIcon from '@/components/SvgIcon'
import './index.less'
const Empty = () => {
  return (
    <div className='w-public-empty'>
      <div className='w-public-empty-image'>
        <SvgIcon iconClass='empty' />
      </div>
      <span>
        暂无数据
      </span>
    </div>
  )
}
export default Empty
