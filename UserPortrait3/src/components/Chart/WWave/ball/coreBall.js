import { createWHTML, $ } from '../utils/index'
import WaterWave from '../waterWave/index'
import React from 'react'
import { render } from 'react-dom'
// import CountUp from 'react-countup'
import { formatFloat, conversionUnit } from '@/common/utils'
import { Tooltip } from 'antd'

export default class CoreBall {
  constructor(wwave) {
    this.setDefaults(wwave)
    this.setupWrapper()
    this.render()
  }
  setDefaults(wwave) {
    this.wwave = wwave
    this.data = wwave.data
    this.width = wwave.coreWidth
    this.height = wwave.coreWidth
    this.left = wwave.width / 2 - this.width / 2
    this.top = wwave.height / 2 - this.height / 2
  }
  // 重置大小
  resize(wwave) {
    this.setDefaults(wwave)
    $.attr(this.$element, {
      x: this.left,
      y: this.top,
      width: Math.floor(this.width),
      height: Math.floor(this.height)
    })
    $.attr(this.text, {
      width: this.width + 20,
      height: this.height + 20
    })
    $.attr(this.waveWrapped, {
      width: Math.floor(this.width - 14),
      height: Math.floor(this.height - 15)
    })
    this.wave.resize({
      width: Math.floor(this.width),
      height: Math.floor(this.height - 14),
      isResize: true
    })
  }
  /**
   * 设置阶段目标值
   * 目标值规则为：
   * 如果值为0～1000，则阶段目标值为1000，如果值为1000～10000，则阶段目标值为10000，以此类推。
   */
  setStageObjectives(value) {
    return Math.pow(10, Math.max(String(value).length, 3))
  }

  setupWrapper() {
    this.$element = createWHTML('div', {
      x: this.left,
      y: this.top,
      width: Math.floor(this.width),
      height: Math.floor(this.height),
      class: 'w-core-ball'
    })

    this.text = createWHTML('div', {
      width: this.width + 20,
      height: this.height + 20,
      x: -10,
      y: -10,
      class: 'w-core-ball-text'
    })
    let userAll = conversionUnit({ val: this.data.userTotal, digit: 1, retrunArray: true })
    render(
      <Tooltip title={(<div>
        用户总量等于各渠道用户数减去重复的用户数量
      </div>)}>
        <div className='w-core-ball-text-wrapper'>
          <div>
            {!!this.data.userTotal &&
            <React.Fragment>
              <span className='w-core-ball-text-label'>用户总量</span>
              <div className='w-core-ball-text-num'>
                { userAll[0] }
                <span className='w-core-ball-text-unit'>{userAll[1]}</span>
              </div>
              {/* <CountUp
                // separator=','
                end={ userAll }
                duration={0.5}
              /> */}
            </React.Fragment>
            }
            {!this.data.userTotal &&
            <span>暂无数据</span>
            }
          </div>
        </div>
      </Tooltip>
      , this.text)
    this.$element.appendChild(this.text)
    setTimeout(() => {
      this.wave = new WaterWave(
        {
          width: Math.floor(this.width),
          height: Math.floor(this.height - 14),
          type: 'circle',
          rangeValue: this.data.userTotal ? formatFloat(this.data.userTotal / this.setStageObjectives(this.data.userTotal) * 100) : 0,
          colors: this.wwave.options.ball.coreBall.colors
        },
        this.wwave.timers
      )
      this.waveWrapped.appendChild(this.wave.$element)
    }, 300)
    this.waveWrapped = createWHTML('div', {
      width: Math.floor(this.width - 14),
      height: Math.floor(this.height - 15),
      x: 7,
      y: 7,
      class: 'w-core-ball-wave'
    })
    this.$element.appendChild(this.waveWrapped)
  }
  render() {}
}
