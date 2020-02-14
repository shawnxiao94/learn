import { $, createWHTML } from '../utils/index'
import React from 'react'
import { render } from 'react-dom'
import SvgIcon from '@/components/SvgIcon'
import { channelFiltersIcon } from '@/common/filters/status'
import { canvasFromRetina } from '@/common/utils/canvas'
// import Popup from '../popup/index'
export default class Subball {
  constructor(wwave) {
    this.setupWrapper()
    this.setDefaults(wwave)
    this.render()
  }
  setDefaults(wwave) {
    this.wwave = wwave
    this.data = wwave.data.channelTotalList ? wwave.data : {
      channelTotalList: []
    }
    this.length = wwave.data.length
    // this.width = Math.min(wwave.width / 3.4, 260)
    this.width = Math.min(wwave.width / 3.4, 300)
    this.height = wwave.height / Math.ceil(this.length / 2)
    // this.popup = new Popup(this.$element, this.wwave)
  }
  // 重置大小
  resize(wwave) {
    const _timeFn = () => {
      this.setDefaults(wwave)
      if (this.data.channelTotalList.length) {
        this.setPolygonSpots()
        this.data.channelTotalList.forEach((item, index) => {
          $.attr(this.circulars[index], {
            x: this.polygonSpots[index][0],
            y: this.polygonSpots[index][1],
            width: this.width,
            height: this.height
          })
        })
        this.makeupLines()
      }
    }
    setTimeout(_timeFn.bind(this))
  }
  getPolygonSpot(sides, centerPoint) {
    let radius = this.wwave.width / 2.2 - this.width / 2
    let _a = []
    for (let i = 0; i < sides; i++) {
      let _index = i + 1
      _a.push([
        centerPoint.x + radius * (_index % 2 !== 0 ? -1 : 1) - this.width / 2,
        (Math.ceil(_index / 2) - 1) * (this.wwave.height / Math.ceil(sides / 2))
      ])
    }
    return _a
  }
  setupWrapper() {
    this.$element = createWHTML('div', {
      x: 0,
      y: 0,
      class: 'w-sub-ball'
    })
  }
  render() {
    this.makeupCircular()
    setTimeout(() => {
      this.makeupLines()
    })
  }
  setPolygonSpots() {
    this.polygonSpots = this.getPolygonSpot(this.data.channelTotalList.length, {
      x: this.wwave.coreBall.left + this.wwave.coreBall.width / 2,
      y: this.wwave.coreBall.top
    })
  }
  makeupCircular() {
    this.circulars = []
    this.waves = []
    if (this.data.channelTotalList.length) {
      this.setPolygonSpots()
      this.data.channelTotalList.forEach((item, index) => {
        this.circulars[index] = createWHTML('div', {
          x: this.polygonSpots[index][0],
          y: this.polygonSpots[index][1],
          width: this.width,
          height: this.height,
          class: 'w-sub-ball-item'
        })
        this.circulars[index].wrapped = createWHTML('div', {
          class: 'w-sub-ball-item-wrapped'
        }, true)
        this.circulars[index].appendChild(this.circulars[index].wrapped)
        let _text = createWHTML('div', {
          class: 'w-sub-ball-item-text'
        },
        true)
        render(
          <React.Fragment>
            <h3><SvgIcon iconClass={channelFiltersIcon(item.channelCode)} />{item.channelName}</h3>
            <div className='w-sub-ball-item-text-describe'>
              <span title='用户数'>
                <SvgIcon iconClass='usernum' />
                {item.userTotal || 0}
              </span>
              <span title='画像数'>
                <SvgIcon iconClass='userportrait' />
                {item.portraitTotal || 0}
              </span>
              <span title='标签数'>
                <SvgIcon iconClass='userlabel' />
                {item.tagTotal || 0}
              </span>
            </div>
          </React.Fragment>
          , _text)
        this.circulars[index].wrapped.appendChild(_text)
        this.$element.appendChild(this.circulars[index])
        $.on(this.circulars[index].wrapped, 'click', e => {
          // this.popup.hide()
          // this.popup.show(
          //     {
          //         title: item.name,
          //         rangeValue: item.rangeValue,
          //         data: item.popupData
          //     },
          //     e
          // )
          e.stopPropagation()
        })
        $.on(this.circulars[index].wrapped, 'mouseover', e => {
          this.makeupLines(true, index)
          e.stopPropagation()
        })
        $.on(this.circulars[index].wrapped, 'mouseout', e => {
          this.makeupLines()
          e.stopPropagation()
        })
      })
      // this.bindHidePopupEvent()
    }
  }
  // bindHidePopupEvent() {
  //     function hide() {
  //         this.popup.hide()
  //     }
  //     $.off(document.getElementById('root'), 'click', hide.bind(this))
  //     $.on(document.getElementById('root'), 'click', hide.bind(this))
  // }
  makeupLines(mouseover, index) {
    if (this.polygonSpots && this.polygonSpots.length) {
      if (!this.$lines) {
        this.$lines = createWHTML(
          'canvas',
          {
            class: 'w-water-lines'
          },
          true
        )
        this.$lines.width = this.wwave.width
        this.$lines.height = this.wwave.height
        this.$context = this.$lines.getContext('2d')
        this.$element.appendChild(this.$lines)
        canvasFromRetina(this.$context, this.$lines)
      }
      this.$context.clearRect(0, 0, this.$lines.width, this.$lines.height)
      this.polygonSpots.forEach((item, index) => {
        this.drawLines(this.$context, item, index)
      })
      if (mouseover) {
        this.drawLines(this.$context, this.polygonSpots[index], index, true)
      }
    }
  }
  /**
     * 画线
     */
  drawLines(context, item, index, isHover, inverse) {
    let isLeftOrRight = index % 2 !== 0 ? 0 : this.width
    $.drawLineArrow({
      context,
      outsideX: item[0] + isLeftOrRight,
      outsideY: item[1] + this.circulars[index].offsetHeight / 2,
      coreX: this.wwave.width / 2,
      coreY: this.wwave.height / 2,
      lineColor: isHover ? this.wwave.options.ball.lineHoverColor : this.wwave.options.ball.lineColor,
      lineWidth: this.wwave.options.ball.lineWidth,
      radius: this.wwave.coreWidth / 2,
      isLeft: index % 2 === 0,
      deviation: 2,
      headlen: 8,
      inverse: inverse || false
    }
    )
  }
}
