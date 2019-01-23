import { $, createGanttHTML } from '../utils/index'
export default class Popup {
  constructor ($wrapper, wwave) {
    this.make($wrapper, wwave)
  }
  make ($wrapper, wwave) {
    this.wwave = wwave
    this.$element = createGanttHTML('div', {
      class: 'w-wave-popup'
    })
    $.on(this.$element, 'click', (e) => {
      e.stopPropagation()
    })
    $wrapper.appendChild(this.$element)
    this.hide()
  }

  show (options, e) {
    const defaultOptions = {
      title: '标题',
      rangeValue: 0
    }
    options = $.objectMerge(defaultOptions, options)
    if (options.customHtml) {
      this.$element.innerHTML = options.customHtml + `<div class="w-wave-popup-pointer"></div>`
    } else {
      this.$element.innerHTML = `
        <div class="w-wave-title">${options.title}</div>
        <div class="w-wave-subtitle">${options.subTitle ? options.subTitle : '占比:' + options.rangeValue + '%'}</div>
        <div class="w-wave-popup-pointer"></div>
      `
    }

    let $parent = $.closest('.w-sub-ball-item', e.target)
    this.$element.style.display = 'inline-block'
    this.width = this.$element.offsetWidth
    this.height = this.$element.offsetHeight
    this.$element.classList.remove('w-wave-popup-left', 'w-wave-popup-right', 'w-wave-popup-bottom')
    let _winWidth = window.innerWidth
    let _rightWidth = _winWidth - (e.clientX + ($parent.offsetWidth - e.offsetX))
    if (this.width > _rightWidth) {
      this.$element.style.right = this.wwave.width - Number($parent.getAttribute('x')) + 10 + 'px'
      this.$element.style.top = Number($parent.getAttribute('y')) + 5 + 'px'
      this.$element.classList.add('w-wave-popup-left')
    } else {
      this.$element.style.left = Number($parent.getAttribute('x')) + Number($parent.offsetWidth) + 10 + 'px'
      this.$element.style.top = Number($parent.getAttribute('y')) + 5 + 'px'
      this.$element.classList.add('w-wave-popup-right')
    }
    let _winHeight = window.innerHeight
    let _bottomHeight = _winHeight - (e.clientY - e.offsetY)
    if (this.height > _bottomHeight) {
      this.$element.style.top = 'auto'
      this.$element.style.bottom = (this.wwave.height - (Number($parent.getAttribute('y')) + Number($parent.offsetHeight) - 20)) + 'px'
      this.$element.classList.add('w-wave-popup-bottom')
    }
  }

  hide () {
    this.$element.style.display = 'none'
  }
}
