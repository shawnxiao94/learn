import Wave from './wave'
import Retina from './retina'
import { $, createGanttHTML } from '../utils/index'

class WaterWave {
  constructor (options) {
    this.setDefaults(options)
    this.resize()
  }
  setDefaults (options) {
    const defaultOptions = {
      width: 300,
      height: 300,
      rangeValue: 50,
      colors: [['#4AA5D8', '#439FD5'], ['#2A86C7', '#6CA8DB']]
    }
    this.options = $.objectMerge(defaultOptions, options)
    this.id = 'CANVAS' + String(Math.random()).replace(/\.|0/g, '')
    this.isDrawContainer = false
    this.$element = createGanttHTML('canvas', {
      class: 'w-water-wave'
    }, true)
  }
  resize () {
    const canvas = this.$element
    canvas.height = this.options.height
    canvas.width = this.options.width
    this.canvas = canvas
    this.canvasWidth = canvas.width
    this.canvasHeight = canvas.height
    this.radius = this.canvasWidth / 2
    // 高清适配
    Retina.run(canvas)
    this.nowRange = 0
    this.rangeValue = this.options.rangeValue
    this.wave1 = new Wave({
      canvasWidth: this.canvasWidth, // 轴长
      canvasHeight: this.canvasHeight, // 轴高
      waveWidth: 0.055, // 波浪宽度,数越小越宽
      waveHeight: 4, // 波浪高度,数越大越高
      colors: this.options.colors[0], // 波浪颜色
      xOffset: 0, // 初始偏移
      speed: 0.04 // 速度
    })
    this.wave2 = new Wave({
      canvasWidth: this.canvasWidth, // 轴长
      canvasHeight: this.canvasHeight, // 轴高
      waveWidth: 0.04, // 波浪宽度,数越小越宽
      waveHeight: 3, // 波浪高度,数越大越高
      colors: this.options.colors[1], // 波浪颜色
      xOffset: 2, // 初始偏移
      speed: 0.02 // 速度
    })
    this.draw()
  }

  draw () {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    if (!this.isDrawContainer) {
      this.drawContainer(ctx)
    }
    // this.drawBackground(ctx);
    if (this.nowRange <= this.rangeValue) {
      this.nowRange += 1
    }
    if (this.nowRange > this.rangeValue) {
      this.nowRange -= 1
    }
    this.wave2.update({
      nowRange: this.nowRange
    })
    this.wave2.draw(ctx)
    this.wave1.update({
      nowRange: this.nowRange
    })
    this.wave1.draw(ctx)
    if (!document.querySelector('.w-wave')) {
      Object.keys(window.WWaveTimers).forEach(key => {
        window.cancelAnimationFrame(window.WWaveTimers[key])
      })
      window.WWaveTimers = {}
      return false
    }
    window.WWaveTimers[this.id] = window.requestAnimationFrame(this.draw.bind(this))
  }

  drawContainer (ctx) {
    const type = this.options.type
    if (type === 'circle') {
      this.drawCircle(ctx)
    } else if (type === 'star') {
      this.drawStar(ctx)
    } else if (type === 'roundRect') {
      this.drawRoundRect(ctx)
    } else if (type === 'heart') {
      this.drawHeart(ctx)
    }
  }

  drawBackground (ctx) {
    const r = this.radius
    const cR = r
    ctx.beginPath()
    ctx.arc(r, r, cR, 0, 2 * Math.PI)
    const grd = ctx.createRadialGradient(r, r, r / 2, r, r, r)
    grd.addColorStop(0, 'rgba(127, 57, 242, 0')
    grd.addColorStop(1, 'rgba(255, 195, 103, 0.11)')
    ctx.fillStyle = grd
    ctx.fill()
  }

  drawCircle (ctx) {
    const r = this.canvasWidth / 2
    const lineWidth = 4
    // const cR = r - (lineWidth)
    const cR = r
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(r, r, cR, 0, 2 * Math.PI)
    // ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)'
    // ctx.stroke()
    ctx.clip()
    this.isDrawContainer = true
  }

  drawStar (ctx, r = 70, R = 140, x = 145, y = 160) {
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)'
    ctx.lineWidth = 2
    for (let i = 0; i < 5; i += 1) {
      ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + x, -Math.sin((18 + i * 72) / 180 * Math.PI) * R + y)
      ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + x, -Math.sin((54 + i * 72) / 180 * Math.PI) * r + y)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.clip()
    this.isDrawContainer = true
  }

  drawRoundRect (ctx, x = 10, y = 10, width = 100, height = 250) {
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)'
    ctx.lineWidth = 2
    const value = height - width
    let radius = width / 2
    if (value < 0) {
      radius = height / 2
    }
    ctx.beginPath()
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2)
    ctx.lineTo(width - radius + x, y)
    ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2)
    ctx.lineTo(width + x, height + y - radius)
    ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2)
    ctx.lineTo(radius + x, height + y)
    ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI)
    ctx.closePath()
    ctx.stroke()

    ctx.clip()
    this.isDrawContainer = true
  }

  drawHeart (ctx, x = 150, y = 130, a = 9) {
    const vertices = []
    for (let i = 0; i < 50; i += 1) {
      const step = i / 50 * (Math.PI * 2) // 设置心上面两点之间的角度，具体分成多少份，好像需要去试。
      const vector = {
        x: a * (16 * Math.pow(Math.sin(step), 3)),
        y: a * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
      }
      vertices.push(vector)
    }
    ctx.save()
    ctx.beginPath()
    ctx.translate(x, y)
    ctx.rotate(Math.PI)
    for (let i = 0; i < 50; i += 1) {
      const vector = vertices[i]
      ctx.lineTo(vector.x, vector.y)
    }
    ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
    ctx.clip()
    this.isDrawContainer = true
  }

  drawSin (ctx, xOffset = 0, nowRange = 0) {
    const points = []
    const canvasWidth = this.canvasWidth
    const canvasHeight = this.canvasHeight
    const startX = 0
    const waveWidth = 0.05 // 波浪宽度,数越小越宽
    const waveHeight = 4 // 波浪高度,数越大越高
    ctx.beginPath()
    ctx.lineWidth = 1
    for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
      const y = waveHeight * Math.sin((startX + x) * waveWidth + xOffset)
      points.push([x, (1 - nowRange) * canvasHeight + y])
      ctx.lineTo(x, (1 - nowRange) * canvasHeight + y)
    }
    ctx.lineTo(canvasWidth, canvasHeight)
    ctx.lineTo(startX, canvasHeight)
    ctx.lineTo(points[0][0], points[0][1])
    const radius = canvasWidth / 2
    const grd = ctx.createLinearGradient(radius, radius, radius, canvasHeight)
    grd.addColorStop(0, '#F39C6B')
    grd.addColorStop(1, '#A0563B')
    ctx.fillStyle = grd
    ctx.fill()
  }
}

export default WaterWave
