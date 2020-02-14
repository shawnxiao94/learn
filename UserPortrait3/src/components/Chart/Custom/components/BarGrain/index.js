/**
  * description: 颗粒柱状图
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import { drawRect, drawText } from '@/common/utils/canvas'
// import { $ } from '@/common/utils/dom'
/**
 * 颗粒柱状图
 */
export default class BarGrain {
  constructor(chart) {
    this.setupOptions(chart)
    // this.$tooltip = this.chart.initTooltip()
    this.render()
    this.initEvent()
  }
  setupOptions(chart) {
    this.chart = chart
  }

  /**
   *  初始化
   *  makeup 绘图
   */
  render() {
    // 运动相关
    this.ctr = this.resizing ? 15 : 1
    this.numctr = 15
    this.makeup()
  }

  /**
   * 初始化Tooltip
   */
  // initTooltip(mousePosition) {
  //   if (mousePosition) {
  //     // let _left, _top
  //     // if (this.$tooltip.offsetWidth > mousePosition.x - 30) {
  //     //   _left = mousePosition.x + 30
  //     // } else {
  //     //   _left = mousePosition.x - (this.$tooltip.offsetWidth + 30)
  //     // }
  //     // if (this.$tooltip.offsetHeight > mousePosition.y - 30) {
  //     //   _top = mousePosition.y + 30
  //     // } else {
  //     //   _top = mousePosition.y - (this.$tooltip.offsetHeight + 30)
  //     // }
  //     $.styles(this.$tooltip, {
  //       // transform: 'translate(' + _left + 'px,' + _top + 'px)',
  //       // webkitTransform: 'translate(' + _left + 'px,' + _top + 'px)'
  //     })
  //   } else {
  //     this.$tooltip.style.display = 'none'
  //   }
  // }
  /**
   *  makeXAxis 绘制图表X轴
   *  makeYAxis 绘制图表Y轴
   *  @param {Object} mousePosition 当前鼠标滑过坐标x,y
   */
  makeup(mousePosition) {
    this.chart.makeXAxis()
    this.chart.makeYAxis()
    this.drawBarAnimate(mousePosition)
    // this.initTooltip(mousePosition)
  }
  
  // 绘制柱形图
  drawBarAnimate(mousePosition) {
    let { options } = this.chart
    let ctx = this.chart.ctx

    let data = options.series[0].data
    let oneWidth = options.calcOptions.width / options.calcOptions.totalXNomber
    let barWidth = Math.min(34, oneWidth * 0.6)
    
    let gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0.5, '#249ADA')
    gradient.addColorStop(1, '#7A42F8')

    let splitNumber = this.chart.options.series[0].splitNumber || 18
    let splitOffset = this.chart.options.series[0].splitOffset || 12
    let oneSplitHeight = options.calcOptions.height / splitNumber - splitOffset
    
    /**
     * 绘制背景
     */
    let b = 0
    while (b < options.calcOptions.totalXNomber) {
      let x = options.calcOptions.offsetLeft + (oneWidth) * b
      let y = options.calcOptions.offsetTop
      let ishover = drawRect({ ctx,
        xa: x,
        ya: y,
        xb: oneWidth,
        yb: options.calcOptions.height,
        mousePosition,
        gradient: {
          hover: 'rgba(0,0,0,.06)',
          color: 'rgba(0,0,0,0)'
        } })
      if (ishover) {
        // this.$tooltip.style.display = 'block'
        // this.$tooltip.innerHTML = `${options.xAxis.data[b]} : ${data[b]}`
        let barSplitLenght = parseInt(splitNumber * (data[b] / options.calcOptions.maxValue * (this.ctr / this.numctr)))
        let y = options.calcOptions.offsetTop + (splitNumber - barSplitLenght) * options.calcOptions.height / splitNumber - 34
        drawText({ ctx,
          xa: x + (oneWidth - barWidth) / 2,
          ya: y,
          textStyle: {
            width: barWidth,
            height: 26,
            fontSize: 14,
            font: '14px/1 PingFang SC, Hiragino Sans GB, Microsoft YaHei',
            bgcolor: '#1C222C',
            borderColor: '#1C222C',
            color: '#AFB0B3',
            data: `${data[b]}`
          } })
      }
      b++
    }

    let i = 0
    while (i < options.calcOptions.totalXNomber) {
      let s = 0
      let barSplitLenght = parseInt(splitNumber * (data[i] / options.calcOptions.maxValue * (this.ctr / this.numctr)))
      let x = options.calcOptions.offsetLeft + (oneWidth) * i + (oneWidth - barWidth) / 2
      let y = options.calcOptions.offsetTop + (splitNumber - barSplitLenght) * options.calcOptions.height / splitNumber + splitOffset
      while (s < barSplitLenght) {
        drawRect({ ctx,
          xa: x,
          ya: y,
          xb: barWidth,
          yb: oneSplitHeight,
          gradient: {
            color: gradient
          } })
        y = y + oneSplitHeight + splitOffset
        s++
      }
      i++
    }
    if (this.ctr < this.numctr) {
      const self = this
      this.ctr++
      setTimeout(() => {
        ctx.clearRect(0, 0, self.chart.width, self.chart.height)
        this.makeup()
      }, 20)
    }
  }

  /**
   *  初始化事件
   */
  initEvent() {
    const self = this
    this.isInitEvent = true
    this.chart.initEvent(
      () => {
        self.chart.ctx.clearRect(0, 0, self.chart.width, self.chart.height)
        self.makeup(self.chart.options.calcOptions.mousePosition)
      })
    this.chart.$canvas.addEventListener('mouseout', () => {
      self.chart.ctx.clearRect(0, 0, self.chart.width, self.chart.height)
      self.makeup()
    })
  }

  /**
   *  重新计算
   */
  resize() {
    if (this.resizing) return
    this.resizing = true
    this.render()
    this.resizing = false
  }
}
