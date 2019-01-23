var WWave = (function () {
  'use strict';

  function $ (expr, con) {
    return typeof expr === 'string'
      ? (con || document).querySelector(expr)
      : expr || null
  }

  function createGanttHTML (tag, attrs, noFixed) {
    const elem = document.createElement(tag);
    for (let attr in attrs) {
      if (attr === 'appendTo') {
        const parent = attrs.appendTo;
        parent.appendChild(elem);
      } else if (attr === 'innerHTML') {
        elem.innerHTML = attrs.innerHTML;
      } else if (attr === 'width' || attr === 'height') {
        elem.style[attr] =
                  String(attrs[attr]).indexOf('%') > -1
                    ? attrs[attr]
                    : attrs[attr] + 'px';
        elem.setAttribute(attr, attrs[attr]);
      } else if (attr === 'x') {
        elem.style.left = attrs[attr] + 'px';
        elem.setAttribute(attr, attrs[attr]);
      } else if (attr === 'y') {
        elem.style.top = attrs[attr] + 'px';
        elem.setAttribute(attr, attrs[attr]);
      } else if (attr === 'styles') {
        $.styles(elem, attrs[attr]);
      } else {
        elem.setAttribute(attr, attrs[attr]);
      }
    }
    if (!noFixed) {
      elem.classList.add('position-absolute');
    }
    return elem
  }

  $.on = (element, event, selector, callback) => {
    if (!callback) {
      callback = selector;
      $.bind(element, event, callback);
    } else {
      $.delegate(element, event, selector, callback);
    }
  };

  $.off = (element, event, handler) => {
    element.removeEventListener(event, handler);
  };

  $.bind = (element, event, callback) => {
    event.split(/\s+/).forEach(function (event) {
      element.addEventListener(event, callback);
    });
  };

  $.delegate = (element, event, selector, callback) => {
    element.addEventListener(event, function (e) {
      const delegatedTarget = e.target.closest(selector);
      if (delegatedTarget) {
        e.delegatedTarget = delegatedTarget;
        callback.call(this, e, delegatedTarget);
      }
    });
  };

  $.closest = (selector, element) => {
    if (!element) return null

    if (element.matches(selector)) {
      return element
    }

    return $.closest(selector, element.parentNode)
  };

  $.attr = (element, attr, value) => {
    if (!value && value !== 0 && typeof attr === 'string') {
      return element.getAttribute(attr)
    }

    if (typeof attr === 'object') {
      for (let key in attr) {
        $.attr(element, key, attr[key]);
      }
      return
    }
    if (attr === 'width' || attr === 'height') {
      element.style[attr] =
              String(value).indexOf('%') > -1 ? value : value + 'px';
    } else if (attr === 'x') {
      element.style.left = value + 'px';
    } else if (attr === 'y') {
      element.style.top = value + 'px';
    }
    element.setAttribute(attr, value);
  };

  $.styles = (element, css, value) => {
    if (!value && value !== 0 && typeof style === 'string') {
      return element.style[css]
    }

    if (typeof css === 'object') {
      for (let key in css) {
        $.styles(element, key, css[key]);
      }
      return
    }
    if (typeof value === 'number') {
      value += 'px';
    }
    element.style[css] = value;
  };

  $.deepClone = source => {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = $.deepClone(source[keys]);
        } else {
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj
  };

  $.objectMerge = (target, source) => {
    if (typeof target !== 'object') {
      target = {};
    }
    if (Array.isArray(source)) {
      return source.slice()
    }
    for (const property in source) {
      if (source.hasOwnProperty(property)) {
        const sourceProperty = source[property];
        if (typeof sourceProperty === 'object') {
          target[property] = $.objectMerge(
            target[property],
            sourceProperty
          );
          continue
        }
        target[property] = sourceProperty;
      }
    }
    return target
  };

  /* eslint-disable */
  if (!Element.prototype.matches)
      Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                  Element.prototype.webkitMatchesSelector;
  if (!Element.prototype.closest)
  Element.prototype.closest = function(s) {
      var el = this;
      if (!document.documentElement.contains(el)) return null;
      do {
          if (el.matches(s)) return el;
          el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1); 
      return null;
  };

  class CoreBall {
    constructor (wwave) {
      this.setDefaults(wwave);
      this.setOptions();
      this.setupWrapper();
      this.render();
    }
    setDefaults (wwave) {
      this.wwave = wwave;
      this.data = wwave.data;
      this.width = wwave.unitWidth;
      this.height = wwave.unitWidth;
      this.left = wwave.width / 2 - this.width / 2;
      this.top = wwave.width / 2 - this.width / 2;
    }
    setOptions () {
      this.options = {
      };
    }
    setupWrapper () {
      this.$element = createGanttHTML('div', {
        x: this.left,
        y: this.top,
        width: this.width,
        height: this.height,
        class: 'w-core-ball'
      });
      this.$img = createGanttHTML('img', {
        width: '100%',
        height: '100%',
        src: this.wwave.options.coreImg
      });
      this.$element.appendChild(this.$img);
    }
    render () {
    }
  }

  class Wave {
    constructor ({
      canvasWidth, // 轴长
      canvasHeight, // 轴高
      waveWidth = 0.055, // 波浪宽度,数越小越宽
      waveHeight = 6, // 波浪高度,数越大越高
      xOffset = 0,
      speed = 0.04,
      colors = ['#DBB77A', '#BF8F3B'] // 波浪颜色
    } = {}) {
      this.points = [];
      this.startX = 0;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.waveWidth = waveWidth;
      this.waveHeight = waveHeight;
      this.xOffset = xOffset;
      this.speed = speed;
      this.colors = colors;
    }
    getChartColor (ctx) {
      const radius = this.canvasWidth / 2;
      const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
      grd.addColorStop(0, this.colors[0]);
      grd.addColorStop(1, this.colors[1]);
      return grd
    }
    draw (ctx) {
      ctx.save();
      const points = this.points;
      ctx.beginPath();
      for (let i = 0; i < points.length; i += 1) {
        const point = points[i];
        ctx.lineTo(point[0], point[1]);
      }
      ctx.lineTo(this.canvasWidth, this.canvasHeight);
      ctx.lineTo(this.startX, this.canvasHeight);
      ctx.lineTo(points[0][0], points[0][1]);
      ctx.fillStyle = this.getChartColor(ctx);
      ctx.fill();
      ctx.restore();
    }
    update ({
      nowRange
    } = {}) {
      this.points = [];
      const {
        startX, waveHeight, waveWidth, canvasWidth, canvasHeight, xOffset
      } = this;
      for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
        const y = Math.sin(((startX + x) * waveWidth) + xOffset);
        const dY = canvasHeight * (1 - (nowRange / 100));
        this.points.push([x, dY + (y * waveHeight)]);
      }
      this.xOffset += this.speed;
    }
  }

  var Retina = {
    run (canvasEl) {
      const canvas = canvasEl;
      const ctx = canvas.getContext('2d');
      const devicePixelRatio = window.devicePixelRatio || 1;
      const backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

      const ratio = devicePixelRatio / backingStorePixelRatio;
      if (devicePixelRatio !== backingStorePixelRatio) {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = `${oldWidth}px`;
        canvas.style.height = `${oldHeight}px`;
        ctx.scale(ratio, ratio);
      }
    }
  };

  class WaterWave {
    constructor (options) {
      this.setDefaults(options);
      this.resize();
    }
    setDefaults (options) {
      const defaultOptions = {
        width: 300,
        height: 300,
        rangeValue: 50,
        colors: [['#4AA5D8', '#439FD5'], ['#2A86C7', '#6CA8DB']]
      };
      this.options = $.objectMerge(defaultOptions, options);
      this.id = 'CANVAS' + String(Math.random()).replace(/\.|0/g, '');
      this.isDrawContainer = false;
      this.$element = createGanttHTML('canvas', {
        class: 'w-water-wave'
      }, true);
    }
    resize () {
      const canvas = this.$element;
      canvas.height = this.options.height;
      canvas.width = this.options.width;
      this.canvas = canvas;
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;
      this.radius = this.canvasWidth / 2;
      // 高清适配
      Retina.run(canvas);
      this.nowRange = 0;
      this.rangeValue = this.options.rangeValue;
      this.wave1 = new Wave({
        canvasWidth: this.canvasWidth, // 轴长
        canvasHeight: this.canvasHeight, // 轴高
        waveWidth: 0.055, // 波浪宽度,数越小越宽
        waveHeight: 4, // 波浪高度,数越大越高
        colors: this.options.colors[0], // 波浪颜色
        xOffset: 0, // 初始偏移
        speed: 0.04 // 速度
      });
      this.wave2 = new Wave({
        canvasWidth: this.canvasWidth, // 轴长
        canvasHeight: this.canvasHeight, // 轴高
        waveWidth: 0.04, // 波浪宽度,数越小越宽
        waveHeight: 3, // 波浪高度,数越大越高
        colors: this.options.colors[1], // 波浪颜色
        xOffset: 2, // 初始偏移
        speed: 0.02 // 速度
      });
      this.draw();
    }

    draw () {
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      if (!this.isDrawContainer) {
        this.drawContainer(ctx);
      }
      // this.drawBackground(ctx);
      if (this.nowRange <= this.rangeValue) {
        this.nowRange += 1;
      }
      if (this.nowRange > this.rangeValue) {
        this.nowRange -= 1;
      }
      this.wave2.update({
        nowRange: this.nowRange
      });
      this.wave2.draw(ctx);
      this.wave1.update({
        nowRange: this.nowRange
      });
      this.wave1.draw(ctx);
      if (!document.querySelector('.w-wave')) {
        Object.keys(window.WWaveTimers).forEach(key => {
          window.cancelAnimationFrame(window.WWaveTimers[key]);
        });
        window.WWaveTimers = {};
        return false
      }
      window.WWaveTimers[this.id] = window.requestAnimationFrame(this.draw.bind(this));
    }

    drawContainer (ctx) {
      const type = this.options.type;
      if (type === 'circle') {
        this.drawCircle(ctx);
      } else if (type === 'star') {
        this.drawStar(ctx);
      } else if (type === 'roundRect') {
        this.drawRoundRect(ctx);
      } else if (type === 'heart') {
        this.drawHeart(ctx);
      }
    }

    drawBackground (ctx) {
      const r = this.radius;
      const cR = r;
      ctx.beginPath();
      ctx.arc(r, r, cR, 0, 2 * Math.PI);
      const grd = ctx.createRadialGradient(r, r, r / 2, r, r, r);
      grd.addColorStop(0, 'rgba(127, 57, 242, 0');
      grd.addColorStop(1, 'rgba(255, 195, 103, 0.11)');
      ctx.fillStyle = grd;
      ctx.fill();
    }

    drawCircle (ctx) {
      const r = this.canvasWidth / 2;
      const lineWidth = 4;
      // const cR = r - (lineWidth)
      const cR = r;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.arc(r, r, cR, 0, 2 * Math.PI);
      // ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)'
      // ctx.stroke()
      ctx.clip();
      this.isDrawContainer = true;
    }

    drawStar (ctx, r = 70, R = 140, x = 145, y = 160) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i += 1) {
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + x, -Math.sin((18 + i * 72) / 180 * Math.PI) * R + y);
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + x, -Math.sin((54 + i * 72) / 180 * Math.PI) * r + y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.clip();
      this.isDrawContainer = true;
    }

    drawRoundRect (ctx, x = 10, y = 10, width = 100, height = 250) {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
      ctx.lineWidth = 2;
      const value = height - width;
      let radius = width / 2;
      if (value < 0) {
        radius = height / 2;
      }
      ctx.beginPath();
      ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
      ctx.lineTo(width - radius + x, y);
      ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
      ctx.lineTo(width + x, height + y - radius);
      ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
      ctx.lineTo(radius + x, height + y);
      ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
      ctx.closePath();
      ctx.stroke();

      ctx.clip();
      this.isDrawContainer = true;
    }

    drawHeart (ctx, x = 150, y = 130, a = 9) {
      const vertices = [];
      for (let i = 0; i < 50; i += 1) {
        const step = i / 50 * (Math.PI * 2); // 设置心上面两点之间的角度，具体分成多少份，好像需要去试。
        const vector = {
          x: a * (16 * Math.pow(Math.sin(step), 3)),
          y: a * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
        };
        vertices.push(vector);
      }
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.rotate(Math.PI);
      for (let i = 0; i < 50; i += 1) {
        const vector = vertices[i];
        ctx.lineTo(vector.x, vector.y);
      }
      ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
      ctx.clip();
      this.isDrawContainer = true;
    }

    drawSin (ctx, xOffset = 0, nowRange = 0) {
      const points = [];
      const canvasWidth = this.canvasWidth;
      const canvasHeight = this.canvasHeight;
      const startX = 0;
      const waveWidth = 0.05; // 波浪宽度,数越小越宽
      const waveHeight = 4; // 波浪高度,数越大越高
      ctx.beginPath();
      ctx.lineWidth = 1;
      for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
        const y = waveHeight * Math.sin((startX + x) * waveWidth + xOffset);
        points.push([x, (1 - nowRange) * canvasHeight + y]);
        ctx.lineTo(x, (1 - nowRange) * canvasHeight + y);
      }
      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.lineTo(startX, canvasHeight);
      ctx.lineTo(points[0][0], points[0][1]);
      const radius = canvasWidth / 2;
      const grd = ctx.createLinearGradient(radius, radius, radius, canvasHeight);
      grd.addColorStop(0, '#F39C6B');
      grd.addColorStop(1, '#A0563B');
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  class Popup {
    constructor ($wrapper, wwave) {
      this.make($wrapper, wwave);
    }
    make ($wrapper, wwave) {
      this.wwave = wwave;
      this.$element = createGanttHTML('div', {
        class: 'w-wave-popup'
      });
      $.on(this.$element, 'click', (e) => {
        e.stopPropagation();
      });
      $wrapper.appendChild(this.$element);
      this.hide();
    }

    show (options, e) {
      const defaultOptions = {
        title: '标题',
        rangeValue: 0
      };
      options = $.objectMerge(defaultOptions, options);
      if (options.customHtml) {
        this.$element.innerHTML = options.customHtml + `<div class="w-wave-popup-pointer"></div>`;
      } else {
        this.$element.innerHTML = `
        <div class="w-wave-title">${options.title}</div>
        <div class="w-wave-subtitle">${options.subTitle ? options.subTitle : '占比:' + options.rangeValue + '%'}</div>
        <div class="w-wave-popup-pointer"></div>
      `;
      }

      let $parent = $.closest('.w-sub-ball-item', e.target);
      this.$element.style.display = 'inline-block';
      this.width = this.$element.offsetWidth;
      this.height = this.$element.offsetHeight;
      this.$element.classList.remove('w-wave-popup-left', 'w-wave-popup-right', 'w-wave-popup-bottom');
      let _winWidth = window.innerWidth;
      let _rightWidth = _winWidth - (e.clientX + ($parent.offsetWidth - e.offsetX));
      if (this.width > _rightWidth) {
        this.$element.style.right = this.wwave.width - Number($parent.getAttribute('x')) + 10 + 'px';
        this.$element.style.top = Number($parent.getAttribute('y')) + 5 + 'px';
        this.$element.classList.add('w-wave-popup-left');
      } else {
        this.$element.style.left = Number($parent.getAttribute('x')) + Number($parent.offsetWidth) + 10 + 'px';
        this.$element.style.top = Number($parent.getAttribute('y')) + 5 + 'px';
        this.$element.classList.add('w-wave-popup-right');
      }
      let _winHeight = window.innerHeight;
      let _bottomHeight = _winHeight - (e.clientY - e.offsetY);
      if (this.height > _bottomHeight) {
        this.$element.style.top = 'auto';
        this.$element.style.bottom = (this.wwave.height - (Number($parent.getAttribute('y')) + Number($parent.offsetHeight) - 20)) + 'px';
        this.$element.classList.add('w-wave-popup-bottom');
      }
    }

    hide () {
      this.$element.style.display = 'none';
    }
  }

  class Subball {
    constructor (wwave) {
      this.setupWrapper();
      this.setDefaults(wwave);
      this.render();
    }
    setDefaults (wwave) {
      this.wwave = wwave;
      this.data = wwave.data;
      this.length = wwave.data.length;
      this.width = wwave.unitWidth;
      this.height = wwave.unitWidth;
      this.distance = wwave.width / 3.2;
      this.popup = new Popup(this.$element, this.wwave);
    }
    getPolygonSpot (radius, sides, centerPoint) {
      let _a = [];
      for (let i = 0; i < sides; i++) {
        _a.push([radius * Math.cos(2 * Math.PI * i / sides) + centerPoint.x, radius * Math.sin(2 * Math.PI * i / sides) + centerPoint.y]);
      }
      return _a
    }
    setupWrapper () {
      this.$element = createGanttHTML('div', {
        x: 0,
        y: 0,
        class: 'w-sub-ball'
      });
    }
    render () {
      this.makeupCircular();
      this.makeupLines();
    }
    makeupCircular () {
      this.circulars = [];
      let _len = this.wwave.data.length;
      if (_len) {
        this.polygonSpots = this.getPolygonSpot(this.distance, _len, {
          x: this.wwave.coreBall.left,
          y: this.wwave.coreBall.top
        });
        this.wwave.data.forEach((item, index) => {
          this.circulars[index] = createGanttHTML('div', {
            x: this.polygonSpots[index][0],
            y: this.polygonSpots[index][1],
            width: this.width,
            height: this.height,
            class: 'w-sub-ball-item'
          });
          let _wave = new WaterWave({
            width: this.width + 20,
            height: this.height,
            type: 'circle',
            rangeValue: item.rangeValue,
            colors: this.wwave.options.ball.subBall.colors
          }, this.wwave.timers);
          this.$wave = createGanttHTML('div', {
            width: this.width,
            height: this.height,
            class: 'w-sub-ball-item-wave'
          });
          this.$wave.appendChild(_wave.$element);
          this.circulars[index].appendChild(this.$wave);
          this.$img = createGanttHTML('img', {
            src: item.img,
            class: 'w-sub-ball-item-img'
          });
          this.circulars[index].appendChild(this.$img);
          this.$text = createGanttHTML('div', {
            innerHTML: item.name + ',' + item.rangeValue + '%',
            class: 'w-sub-ball-item-text'
          });
          this.circulars[index].appendChild(this.$text);
          this.$element.appendChild(this.circulars[index]);
          $.on(this.circulars[index], 'click', (e) => {
            this.popup.hide();
            let customHtml = {};
            if (item.popupData && item.popupData.length && this.wwave.options.popup.formatPopupData) {
              customHtml = this.wwave.options.popup.formatPopupData(item);
            }
            this.popup.show({
              title: item.name,
              rangeValue: item.rangeValue,
              ...customHtml
            }, e);
            e.stopPropagation();
          });
        });
        this.bindHidePopupEvent();
      }
    }
    bindHidePopupEvent () {
      function hide () {
        this.popup.hide();
      }
      $.off(document.querySelector('body'), 'click', hide.bind(this));
      $.on(document.querySelector('body'), 'click', hide.bind(this));
    }
    makeupLines () {
      if (this.polygonSpots && this.polygonSpots.length) {
        this.$lines = createGanttHTML('canvas', {
          class: 'w-water-lines'
        }, true);
        this.$lines.width = this.wwave.width;
        this.$lines.height = this.wwave.height;

        let context = this.$lines.getContext('2d');
        context.strokeStyle = this.wwave.options.ball.lineColor;
        context.lineWidth = this.wwave.options.ball.lineWidth;
        let _coreWidth = this.wwave.width / 2;
        for (let item of this.polygonSpots) {
          context.moveTo(_coreWidth, _coreWidth);
          context.lineTo(item[0] + this.width / 2, item[1] + this.width / 2);
        }
        context.stroke();
        this.$element.appendChild(this.$lines);
      }
    }
  }

  class WWave {
    constructor ($wrapper, options, data) {
      this.setupWrapper($wrapper);
      this.setupOptions(options);
      this.setupData(data);
      this.setTimers();
      this.render();
    }
    // 初始化所有框架标签
    setupWrapper ($wrapper) {
      if (typeof $wrapper === 'string') {
        $wrapper = document.querySelector($wrapper);
      }
      if ($wrapper instanceof HTMLElement) ; else {
        throw new TypeError('请添加选择器！')
      }
      this.$element = createGanttHTML('div', {
        class: 'w-wave'
      }, true);
      $wrapper.appendChild(this.$element);
      this.$wrapper = $wrapper;
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
      };
      this.options = $.objectMerge(defaultOptions, options);
    }
    setupData (data) {
      this.data = data || [];
    }
    setTimers () {
      window.WWaveTimers = {};
    }
    refresh () {
      this.render();
    }
    render () {
      this.clear();
      this.setWrapperSize();
      this.makeupBall();
    }
    clear () {
      if (Object.keys(window.WWaveTimers).length) {
        Object.keys(window.WWaveTimers).forEach(key => {
          window.cancelAnimationFrame(window.WWaveTimers[key]);
        });
        window.WWaveTimers = {};
      }
      this.$element.innerHTML = '';
    }
    setWrapperSize () {
      this.width = this.$wrapper.offsetHeight;
      this.height = this.$wrapper.offsetHeight;
      $.attr(this.$element, {
        width: this.width,
        height: this.height
      });
      this.unitWidth = this.data.length ? this.width / Math.max(this.data.length, 5.7) / 0.8 : 0;
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
      this.makeupCoreBall();
      this.makeupSubBall();
    }
    // 初始化中心球体
    makeupCoreBall () {
      this.coreBall = new CoreBall(this);
      this.$element.appendChild(this.coreBall.$element);
    }
    // 初始化子球
    makeupSubBall () {
      const subBall = new Subball(this);
      this.$element.appendChild(subBall.$element);
    }
  }

  return WWave;

}());
