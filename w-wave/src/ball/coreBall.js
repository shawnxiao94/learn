import { $, createGanttHTML } from '../utils/index'

export default class CoreBall {
  constructor (wwave) {
    this.setDefaults(wwave)
    this.setOptions()
    this.setupWrapper()
    this.render()
  }
  setDefaults (wwave) {
    this.wwave = wwave
    this.data = wwave.data
    this.width = wwave.unitWidth
    this.height = wwave.unitWidth
    this.left = wwave.width / 2 - this.width / 2
    this.top = wwave.width / 2 - this.width / 2
  }
  setOptions () {
    this.options = {
    }
  }
  setupWrapper () {
    this.$element = createGanttHTML('div', {
      x: this.left,
      y: this.top,
      width: this.width,
      height: this.height,
      class: 'w-core-ball'
    })
    this.$img = createGanttHTML('img', {
      width: '100%',
      height: '100%',
      src: this.wwave.options.coreImg
    })
    this.$element.appendChild(this.$img)
  }
  render () {
  }
}
