import { $, createWHTML } from './utils/index'
import CoreBall from './ball/coreBall'
import SubBall from './ball/subBall'

import './styles/w-wave.less'

export default class WWave {
  constructor($wrapper, options, data) {
    this.setupWrapper($wrapper)
    this.setupOptions(options)
    this.setTimers()
    this.setupData(data)
    this.render()
  }
  /**
   * 初始化所有框架标签
   * @param {""||String} $wrapper
   */
  setupWrapper($wrapper) {
    if (typeof $wrapper === 'string') {
      $wrapper = document.querySelector($wrapper)
    }
    if (!($wrapper instanceof HTMLElement)) {
      throw new TypeError('请添加选择器！')
    }
    this.$element = createWHTML(
      'div',
      {
        class: 'w-wave'
      },
      true
    )
    $wrapper.appendChild(this.$element)
    this.$wrapper = $wrapper
  }
  setupOptions(options) {
    const defaultOptions = {
      /**
       *  球体配置
       */
      ball: {
        boreBall: {},
        coreBall: {
          colors: [['#293A5A', '#1D69B4'], ['#27384B', '#1E4B78']]
        },
        lineWidth: 3,
        lineColor: '#23262B'
      },
      popup: {}
    }
    this.options = $.objectMerge(defaultOptions, options)
  }
  setupData(data) {
    this.data = data || []
  }
  setTimers() {
    window.WWaveTimers = {}
  }
  refresh(data) {
    this.setupData(data)
    this.render()
  }
  render() {
    this.clear()
    this.setWrapperSize()
    this.makeupBall()
  }
  /**
   *  重新计算宽度
   */
  resize() {
    if (this.$wrapper.offsetWidth === 0) {
      /**
       * 当图表父层DOM状态为display：none，不重新计算图表尺寸，以免以0宽度0高度计算错位
       */
      return
    }
    const _timeFn = () => {
      this.setWrapperSize()
      this.coreBall.resize(this)
      this.subBall.resize(this)
    }
    setTimeout(_timeFn.bind(this))
  }
  /**
   *  清除
   */
  clear() {
    if (Object.keys(window.WWaveTimers).length) {
      Object.keys(window.WWaveTimers).forEach(key => {
        window.cancelAnimationFrame(window.WWaveTimers[key])
      })
      window.WWaveTimers = {}
    }
    this.$element.innerHTML = ''
  }
  setWrapperSize() {
    this.width = this.$wrapper.offsetWidth
    this.height = this.$wrapper.offsetHeight
    this.coreWidth = Math.min(this.width / 6, this.height - 60, 200)
    $.attr(this.$element, {
      width: this.width,
      height: this.height
    })
  }
  /**
   *  初始化球体
   *  makeupBall
   *  初始化中心球体
   *  makeupBoreBall
   *  初始化子球
   *  makeupSubBall
   */
  makeupBall() {
    this.makeupCoreBall()
    this.makeupSubBall()
  }
  /**
   *  初始化中心球体
   */
  makeupCoreBall() {
    this.coreBall = new CoreBall(this)
    this.$element.appendChild(this.coreBall.$element)
  }
  /**
   *  初始化子球
   */
  makeupSubBall() {
    this.subBall = new SubBall(this)
    this.$element.appendChild(this.subBall.$element)
  }
}
