export function $(expr, con) {
  return typeof expr === 'string'
    ? (con || document).querySelector(expr)
    : expr || null
}

export function createWHTML(tag, attrs, noFixed) {
  const elem = document.createElement(tag)
  for (let attr in attrs) {
    if (attr === 'appendTo') {
      const parent = attrs.appendTo
      parent.appendChild(elem)
    } else if (attr === 'innerHTML') {
      elem.innerHTML = attrs.innerHTML
    } else if (attr === 'width' || attr === 'height') {
      elem.style[attr] =
        String(attrs[attr]).indexOf('%') > -1
          ? attrs[attr]
          : attrs[attr] + 'px'
      elem.setAttribute(attr, attrs[attr])
    } else if (attr === 'x') {
      elem.style.left = attrs[attr] + 'px'
      elem.setAttribute(attr, attrs[attr])
    } else if (attr === 'y') {
      elem.style.top = attrs[attr] + 'px'
      elem.setAttribute(attr, attrs[attr])
    } else if (attr === 'styles') {
      $.styles(elem, attrs[attr])
    } else {
      elem.setAttribute(attr, attrs[attr])
    }
  }
  if (!noFixed) {
    elem.classList.add('position-absolute')
  }
  return elem
}

$.on = (element, event, selector, callback) => {
  if (!callback) {
    callback = selector
    $.bind(element, event, callback)
  } else {
    $.delegate(element, event, selector, callback)
  }
}

$.off = (element, event, handler) => {
  element.removeEventListener(event, handler)
}

$.bind = (element, event, callback) => {
  event.split(/\s+/).forEach(function(event) {
    element.addEventListener(event, callback)
  })
}

$.delegate = (element, event, selector, callback) => {
  element.addEventListener(event, function(e) {
    const delegatedTarget = e.target.closest(selector)
    if (delegatedTarget) {
      e.delegatedTarget = delegatedTarget
      callback.call(this, e, delegatedTarget)
    }
  })
}

$.closest = (selector, element) => {
  if (!element) return null

  if (element.matches(selector)) {
    return element
  }

  return $.closest(selector, element.parentNode)
}

$.attr = (element, attr, value) => {
  if (!value && value !== 0 && typeof attr === 'string') {
    return element.getAttribute(attr)
  }

  if (typeof attr === 'object') {
    for (let key in attr) {
      $.attr(element, key, attr[key])
    }
    return
  }
  if (attr === 'width' || attr === 'height') {
    element.style[attr] =
      String(value).indexOf('%') > -1 ? value : value + 'px'
  } else if (attr === 'x') {
    element.style.left = value + 'px'
  } else if (attr === 'y') {
    element.style.top = value + 'px'
  }
  element.setAttribute(attr, value)
}

$.styles = (element, css, value) => {
  if (!value && value !== 0 && typeof style === 'string') {
    return element.style[css]
  }

  if (typeof css === 'object') {
    for (let key in css) {
      $.styles(element, key, css[key])
    }
    return
  }
  if (typeof value === 'number') {
    value += 'px'
  }
  element.style[css] = value
}

$.deepClone = source => {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = $.deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

$.objectMerge = (target, source) => {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = $.objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}

/**
 * 绘制带有箭头的直线
 * @param context canvas画布变量
 * @param outsideX  外部起点坐标
 * @param coreX 圆心坐标
 * @param lineColor 线色
 * @param lineWidth 线宽
 * @param radius 半径
 * @param isLeft 是左还是右
 * @param deviation 离球体偏移量
 * @param headlen 箭头线长
 * @param inverse 箭头流向
 **/
$.drawLineArrow = ({
  context,
  outsideX,
  outsideY,
  coreX,
  coreY,
  lineColor,
  lineWidth,
  radius,
  isLeft,
  deviation,
  headlen,
  inverse
}) => {
  /**
     * 画直线
     */
  let angle = Math.atan2(outsideY - coreY, outsideX - coreX) * 180 / Math.PI
  let coreLineX = radius * Math.cos(angle * Math.PI / 180) + coreX - deviation * (isLeft ? 1 : -1)
  let coreLineY = radius * Math.sin(angle * Math.PI / 180) + coreY
  context.beginPath()
  context.moveTo(outsideX, outsideY)
  context.lineTo(coreLineX, coreLineY)
  context.strokeStyle = lineColor
  context.lineWidth = lineWidth
  context.stroke()
    
  /**
     * 箭头指向正反
     */
  let arrowBeginX, arrowBeginY, arrowToX, arrowToY
  if (inverse) {
    arrowBeginX = coreLineX
    arrowBeginY = coreLineY
    arrowToX = outsideX
    arrowToY = outsideY
  } else {
    arrowBeginX = outsideX
    arrowBeginY = outsideY
    arrowToX = coreLineX
    arrowToY = coreLineY
  }

  /**
     * 绘制箭头
     */
  // 自定义箭头线与直线的夹角，个人觉得45°刚刚好
  let theta = 42
  // 箭头线终点坐标
  let arrowX, arrowY
  // 计算各角度和对应的箭头终点坐标
  let arrowAngle = Math.atan2(arrowBeginY - arrowToY, arrowBeginX - arrowToX) * 180 / Math.PI
  let angle1 = (arrowAngle + theta) * Math.PI / 180
  let angle2 = (arrowAngle - theta) * Math.PI / 180
  let topX = headlen * Math.cos(angle1)
  let topY = headlen * Math.sin(angle1)
  let botX = headlen * Math.cos(angle2)
  let botY = headlen * Math.sin(angle2)

  arrowX = arrowToX + topX
  arrowY = arrowToY + topY
  // 画上边箭头线
  context.beginPath()
  context.moveTo(arrowX, arrowY)
  context.lineTo(arrowToX, arrowToY)

  let arrowToTerminalX = arrowToX + botX
  let arrowToTerminalY = arrowToY + botY
  // 画下边箭头线
  context.lineTo(arrowToTerminalX, arrowToTerminalY)
  context.lineTo(arrowX, arrowY)

  /**
     * 绘制箭头填充颜色
     */
  context.fillStyle = lineColor
  context.fill()
}

/* eslint-disable */
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
if (!Element.prototype.closest)
Element.prototype.closest = function(s) {
    let el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1); 
    return null;
};