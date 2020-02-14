/**
  * description: 颗粒柱状图
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import './index.less'
import { $ } from '@/common/utils/dom'
import BarGrain from './components/BarGrain'
import Utils from './utils'
import Retina from '@/common/utils/retina'
import { canvasFromRetina } from '@/common/utils/canvas'
export default class ChartCustom extends Utils {
  constructor($wrapper, options) {
    super()
    this.setupWrapper($wrapper)
    this.setupOptions(options)
  }
  /**
   * 初始化标签
   * @param {""||String} $wrapper 外部标签
   */
  setupWrapper($wrapper) {
    if (typeof $wrapper === 'string') {
      $wrapper = document.querySelector($wrapper)
    }
    if (!($wrapper instanceof HTMLElement)) {
      throw new TypeError('请添加选择器！')
    }
    this.$canvas = $.createElement(
      'canvas'
    )
    $wrapper.style.position = 'relative'
    $wrapper.appendChild(this.$canvas)
    Retina.run(this.$canvas)
    this.ctx = this.$canvas.getContext('2d')
    this.$wrapper = $wrapper
  }
  setupOptions(options) {
    const defaultOptions = {
      /**
       *  默认配置
       */
      legend: {},
      tooltip: {},
      xAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: '#787A7E'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3E4045',
            width: 1
          }
        }
      },
      yAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: '#787A7E'
          }
        },
        axisSplit: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#000',
            width: 1
          }
        }
      },
      grid: {
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%'
      },
      series: [],
      textStyle: {
        font: '12px Arial'
      }
    }
    this.options = $.objectMerge(defaultOptions, options)
    this.render()
  }
  render() {
    this.clear()
    this.setWrapperSize()
    this.options.calcOptions = this.getCalcOptions()
    this.makeup()
  }
  setWrapperSize() {
    this.width = this.$wrapper.offsetWidth
    this.height = this.$wrapper.offsetHeight
    $.attr(this.$canvas, {
      width: this.width,
      height: this.height
    })

    /**
     * 解决canvas在retina高清屏（Mac）下失真问题
     */
    this.ratio = canvasFromRetina(this.ctx, this.$canvas)
  }

  /**
   *  清除
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
  /**
   *  初始化
   */
  makeup(type) {
    for (let item of this.options.series) {
      if (item.type === 'barGrain') {
        if (type === 'resize') {
          this.BarGrain.resize()
        }
        !this.BarGrain && this.drawBarGrain()
      }
    }
  }
  /**
   *  绘制颗粒柱状图
   */
  drawBarGrain() {
    this.BarGrain = new BarGrain(this)
  }
  /**
   *  重新计算
   */
  resize() {
    if (this.$wrapper.offsetWidth === 0) {
      /**
       * 当图表父层DOM状态为display：none，不重新计算图表尺寸，以免以0宽度0高度计算错位
       */
      return
    }
    this.setWrapperSize()
    this.options.calcOptions = this.getCalcOptions()
    this.makeup('resize')
  }
}
