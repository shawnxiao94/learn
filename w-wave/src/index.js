import { $, createGanttHTML } from './utils/index'
import CoreBall from './ball/coreBall'
import SubBall from './ball/subBall'

import './styles/w-wave.less'

export default class WWave {
  constructor ($wrapper, options, data) {
    this.setupWrapper($wrapper)
    this.setupOptions(options)
    this.setupData(data)
    this.setTimers()
    this.render()
  }
  // 初始化所有框架标签
  setupWrapper ($wrapper) {
    if (typeof $wrapper === 'string') {
      $wrapper = document.querySelector($wrapper)
    }
    if ($wrapper instanceof HTMLElement) {
    } else {
      throw new TypeError('请添加选择器！')
    }
    this.$element = createGanttHTML('div', {
      class: 'w-wave'
    }, true)
    $wrapper.appendChild(this.$element)
    this.$wrapper = $wrapper
  }
  setupOptions (options) {
    const defaultOptions = {
      /**
       *  球体配置
       * */
      ball: {
        boreBall: {
        },
        subBall: {
          colors: [['#4AA5D8', '#439FD5'], ['#2A86C7', '#6CA8DB']]
        },
        lineWidth: 3,
        lineColor: '#ddd'
      },
      popup: {
      }
    }
    this.options = $.objectMerge(defaultOptions, options)
  }
  setupData (data) {
    this.data = data || []
  }
  setTimers () {
    window.WWaveTimers = {}
  }
  refresh () {
    this.render()
  }
  render () {
    this.clear()
    this.setWrapperSize()
    this.makeupBall()
  }
  clear () {
    if (Object.keys(window.WWaveTimers).length) {
      Object.keys(window.WWaveTimers).forEach(key => {
        window.cancelAnimationFrame(window.WWaveTimers[key])
      })
      window.WWaveTimers = {}
    }
    this.$element.innerHTML = ''
  }
  setWrapperSize () {
    this.width = this.$wrapper.offsetHeight
    this.height = this.$wrapper.offsetHeight
    $.attr(this.$element, {
      width: this.width,
      height: this.height
    })
    this.unitWidth = this.data.length ? this.width / Math.max(this.data.length, 5.7) / 0.8 : 0
  }
  /**
   *  初始化球体
   *  makeupBall
   *  初始化中心球体
   *  makeupBoreBall
   *  初始化子球
   *  makeupSubBall
   */
  makeupBall () {
    this.makeupCoreBall()
    this.makeupSubBall()
  }
  // 初始化中心球体
  makeupCoreBall () {
    this.coreBall = new CoreBall(this)
    this.$element.appendChild(this.coreBall.$element)
  }
  // 初始化子球
  makeupSubBall () {
    const subBall = new SubBall(this)
    this.$element.appendChild(subBall.$element)
  }
}
