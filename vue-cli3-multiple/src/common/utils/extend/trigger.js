/**
 * @see 扩展dispatchEvent事件语法,兼容IE
 */
window.sugar.trigger = function(element, event) {
  if (document.createEventObject) {
    // IE浏览器支持fireEvent方法
    let evt = document.createEventObject();
    evt.dispatchEvent = true;
    return element.fireEvent("on" + event, evt);
  } else {
    // 其他标准浏览器使用dispatchEvent方法
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true);
    evt.dispatchEvent = true;
    return !element.dispatchEvent(evt);
  }
};
