import { $, createGanttHTML } from "../utils/index";
import WaterWave from "../waterWave/index";
import Popup from "../popup/index";
export default class Subball {
  constructor(wwave) {
    this.setupWrapper();
    this.setDefaults(wwave);
    this.render();
  }
  setDefaults(wwave) {
    this.wwave = wwave;
    this.data = wwave.data;
    this.length = wwave.data.length;
    this.width = wwave.unitWidth;
    this.height = wwave.unitWidth;
    this.distance = wwave.width / 3.2;
    this.popup = new Popup(this.$element, this.wwave);
  }
  getPolygonSpot(radius, sides, centerPoint) {
    let _a = [];
    for (let i = 0; i < sides; i++) {
      _a.push([
        radius * Math.cos((2 * Math.PI * i) / sides) + centerPoint.x,
        radius * Math.sin((2 * Math.PI * i) / sides) + centerPoint.y
      ]);
    }
    return _a;
  }
  setupWrapper() {
    this.$element = createGanttHTML("div", {
      x: 0,
      y: 0,
      class: "w-sub-ball"
    });
  }
  render() {
    this.makeupCircular();
    this.makeupLines();
  }
  makeupCircular() {
    this.circulars = [];
    let _len = this.wwave.data.length;
    if (_len) {
      this.polygonSpots = this.getPolygonSpot(this.distance, _len, {
        x: this.wwave.coreBall.left,
        y: this.wwave.coreBall.top
      });
      this.wwave.data.forEach((item, index) => {
        this.circulars[index] = createGanttHTML("div", {
          x: this.polygonSpots[index][0],
          y: this.polygonSpots[index][1],
          width: this.width,
          height: this.height,
          class: "w-sub-ball-item"
        });
        let _wave = new WaterWave(
          {
            width: this.width + 20,
            height: this.height,
            type: "circle",
            rangeValue: item.rangeValue,
            colors: this.wwave.options.ball.subBall.colors
          },
          this.wwave.timers
        );
        this.$wave = createGanttHTML("div", {
          width: this.width,
          height: this.height,
          class: "w-sub-ball-item-wave"
        });
        this.$wave.appendChild(_wave.$element);
        this.circulars[index].appendChild(this.$wave);
        this.$img = createGanttHTML("img", {
          src: item.img,
          class: "w-sub-ball-item-img"
        });
        this.circulars[index].appendChild(this.$img);
        this.$text = createGanttHTML("div", {
          innerHTML: `${item.name} ${
            item.rangeValue === "*"
              ? " " + item.rangeValue
              : ", " + item.rangeValue + "%"
          }`,
          class: "w-sub-ball-item-text"
        });
        this.circulars[index].appendChild(this.$text);
        this.$element.appendChild(this.circulars[index]);
        $.on(this.circulars[index], "click", e => {
          this.popup.hide();
          let customHtml = {};
          if (
            item.popupData &&
            item.popupData.length &&
            this.wwave.options.popup.formatPopupData
          ) {
            customHtml = this.wwave.options.popup.formatPopupData(item);
          }
          this.popup.show(
            {
              title: item.name,
              rangeValue: item.rangeValue,
              data: item.popupData,
              ...customHtml
            },
            e
          );
          e.stopPropagation();
        });
      });
      this.bindHidePopupEvent();
    }
  }
  bindHidePopupEvent() {
    function hide() {
      this.popup.hide();
    }
    $.off(document.querySelector("body"), "click", hide.bind(this));
    $.on(document.querySelector("body"), "click", hide.bind(this));
  }
  makeupLines() {
    if (this.polygonSpots && this.polygonSpots.length) {
      this.$lines = createGanttHTML(
        "canvas",
        {
          class: "w-water-lines"
        },
        true
      );
      this.$lines.width = this.wwave.width;
      this.$lines.height = this.wwave.height;

      let context = this.$lines.getContext("2d");
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
