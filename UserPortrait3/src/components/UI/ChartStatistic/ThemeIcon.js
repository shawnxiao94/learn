import React, { Component } from 'react'
import { Card, Statistic, Icon } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import { formatFloat } from '@/common/utils'
import './ThemeIcon.less'

class ThemeIcon extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { title, value, valueStyle, subTitle, subValue, percent, iconName, bodyStyle } = this.props
    return (
      <Card className='c-chart-icon' bordered={false} bodyStyle={ bodyStyle }>
        <div className='c-chart-icon-wrapper'>
          <div className='c-chart-icon-wrapper-left'>
            <SvgIcon iconClass={iconName} />
          </div>
          <div className='c-chart-icon-wrapper-right'>
            <Statistic
              title={title}
              value={value}
              valueStyle={valueStyle}
            />
            {subTitle && <div className='sub-number'>
              <div>{subTitle} <span style={{ 'color': valueStyle.color }}>{subValue}</span></div>
              <div>
                环比
                {
                  percent !== 0 &&
                  <Icon type='caret-up' style={{ 'color': valueStyle.color, transform: percent < 0 ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
                }
                {isNaN(percent) ? percent : formatFloat(Math.abs(percent) * 100) + '%'}
              </div>
            </div>}
          </div>
        </div>
      </Card>
    )
  }
}
export default ThemeIcon