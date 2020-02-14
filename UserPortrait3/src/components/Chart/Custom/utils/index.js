import { drawLine } from '@/common/utils/canvas'
import { $ } from '@/common/utils/dom'
export default class Utils {
  /**
   * 计算图表相关参数
   */
  /**
   *  获取图表左及上边距
   */
  getOffsetLeft() {
    if (this.options.grid.left.includes('%')) {
      return this.width * (this.options.grid.left.replace('%', '') / 100)
    } else {
      return +this.options.grid.left
    }
  }
  getOffsetTop() {
    if (this.options.grid.top.includes('%')) {
      return this.height * (this.options.grid.top.replace('%', '') / 100)
    } else {
      return +this.options.grid.top
    }
  }
  /**
   *  获取图表右及下边距
   */
  getOffsetRight() {
    if (this.options.grid.right.includes('%')) {
      return this.width * (this.options.grid.right.replace('%', '') / 100)
    } else {
      return +this.options.grid.right
    }
  }
  getOffsetBottom() {
    if (this.options.grid.bottom.includes('%')) {
      return this.height * (this.options.grid.bottom.replace('%', '') / 100)
    } else {
      return +this.options.grid.bottom
    }
  }
  /**
   * 获取图表宽度
   */
  getWidth() {
    return this.width - (this.getOffsetLeft() + this.getOffsetRight())
  }
  /**
   * 获取图表高度
   */
  getHeight() {
    return this.height - (this.getOffsetTop() + this.getOffsetBottom())
  }
  /**
   * offsetLeft 左边距
   * offsetRight 右边距
   * offsetTop 上边距
   * offsetBottom 下边距
   * width 宽度
   * height 高度
   */
  getCalcOptions() {
    return {
      offsetLeft: this.getOffsetLeft(),
      offsetRight: this.getOffsetRight(),
      offsetTop: this.getOffsetTop(),
      offsetBottom: this.getOffsetBottom(),
      width: this.getWidth(),
      height: this.getHeight()
    }
  }
  
  /**
   *  makeXAxis 绘制图表X轴
   */
  makeXAxis() {
    let { options } = this
    let ctx = this.ctx
    /**
     * 画线
     */
    if (options.xAxis.axisLine.show) {
      drawAxisLine()
    }
    function drawAxisLine() {
      ctx.fillStyle = options.xAxis.axisLine.lineStyle.color
      ctx.lineWidth = options.xAxis.axisLine.lineStyle.width
      drawLine(
        {
          ctx,
          xa: options.calcOptions.offsetLeft,
          ya: options.calcOptions.offsetTop + options.calcOptions.height,
          xb: options.calcOptions.offsetLeft + options.calcOptions.width,
          yb: options.calcOptions.offsetTop + options.calcOptions.height,
          gradient: {
            color: ctx.fillStyle
          }
        }
      )
    }
    this.setCalcOptionsTotalXNomber()
    /**
     * 文字,分割线
     */
    if (options.xAxis.axisLabel.show) {
      drawAxisLabel()
    }
    function drawAxisLabel() {
      ctx.font = options.textStyle.font
      ctx.fillStyle = options.xAxis.axisLabel.textStyle.color
      ctx.textAlign = 'center'
      if (options.calcOptions.totalXNomber) {
        let oneWidth = options.calcOptions.width / options.calcOptions.totalXNomber
        let i = 0
        while (i < options.calcOptions.totalXNomber) {
          let markerValue = i * oneWidth
          let x = markerValue + oneWidth / 2 + options.calcOptions.offsetLeft
          let y = options.calcOptions.offsetTop + options.calcOptions.height
          if (options.xAxis.axisLabel.show) {
            ctx.fillText(options.xAxis.data[i], x, y + 22) // 文字
          }
          i++
        }
      }
    }
  }
  /**
   * 获取X个数
   */
  setCalcOptionsTotalXNomber() {
    this.options.calcOptions.totalXNomber = this.options.series[0].data.length
  }

  /**
   *  makeYAxis 绘制图表Y轴
   */
  makeYAxis() {
    let { options } = this
    let ctx = this.ctx
    if (options.yAxis.axisLine.show) {
      drawAxisLine()
    }
    /**
     * 画线
     */
    function drawAxisLine() {
      ctx.lineWidth = options.yAxis.axisLine.lineStyle.width
      drawLine(
        {
          ctx,
          xa: options.calcOptions.offsetLeft - options.xAxis.axisLine.lineStyle.width,
          ya: options.calcOptions.offsetTop,
          xb: options.calcOptions.offsetLeft - options.xAxis.axisLine.lineStyle.width,
          yb: options.calcOptions.offsetTop + options.calcOptions.height,
          gradient: {
            color: '#000'
          }
        }
      )
    }
    this.setCalcOptionsTotalYNomber()
    this.setCalcOptionsMaxMinValue()
    /**
     * 文字,分割线
     */
    if (options.yAxis.axisLabel.show || options.yAxis.axisSplit.show) {
      drawAxisLabel()
    }
    function drawAxisLabel() {
      ctx.font = options.textStyle.font
      if (options.calcOptions.totalYNomber) {
        ctx.textAlign = 'right'
        let oneValue = parseInt(options.calcOptions.maxValue / options.calcOptions.totalYNomber)
        let i = 0
        while (i <= options.calcOptions.totalYNomber) {
          let markerValue = i * oneValue
          let x = options.calcOptions.offsetLeft - 10
          let y = parseInt(options.calcOptions.height * (1 - markerValue / options.calcOptions.maxValue)) + options.calcOptions.offsetTop
          if (options.yAxis.axisLabel.show) {
            ctx.fillStyle = options.yAxis.axisLabel.textStyle.color
            ctx.fillText(markerValue, x, y + 3, 100) // 文字
          }
          if (options.yAxis.axisSplit.show) {
            if (i > 0) {
              drawLine({
                ctx,
                xa: options.calcOptions.offsetLeft,
                ya: y,
                xb: options.calcOptions.offsetLeft + options.calcOptions.width,
                yb: y,
                gradient: {
                  color: '#ff0000'
                }
              }
              )
            }
          }
          i++
        }
      }
    }
  }
  /**
   * 获取Y个数
   */
  setCalcOptionsTotalYNomber() {
    this.options.calcOptions.totalYNomber = Math.floor(this.height / 60)
  }
  /**
   * 获取最大值
   */
  setCalcOptionsMaxMinValue() {
    let maxValue = 0
    let minValue = 0
    for (let serie of this.options.series) {
      for (let item of serie.data) {
        maxValue = Math.max(maxValue, item)
        minValue = Math.min(minValue, item)
      }
    }
    this.options.calcOptions.maxValue = maxValue + 10
    this.options.calcOptions.minValue = minValue
  }
  /**
   * 添加事件
   */
  initEvent(callback) {
    const self = this
    this.$canvas.addEventListener('mousemove', function(e) {
      let mousePosition = self.options.calcOptions.mousePosition = {}
      e = e || window.event
      if (e.layerX || e.layerX == 0) {
        mousePosition.x = e.layerX * self.ratio
        mousePosition.y = e.layerY * self.ratio
      } else if (e.offsetX || e.offsetX == 0) {
        mousePosition.x = e.offsetX * self.ratio
        mousePosition.y = e.offsetY * self.ratio
      }
      callback && callback()
    })
  }
  /**
   * tooltip 浮窗
   */
  initTooltip() {
    this.tooltip = true
    return $.createElement('div', {
      class: 'w-custom-chart-tooltip',
      appendTo: this.$wrapper
    })
  }
}