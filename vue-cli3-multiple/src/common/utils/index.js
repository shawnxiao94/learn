/**
 * 工具包
 */
import moment from "moment";
// 格式化时间
export function parseTime(time, cFormat) {
  if (time) {
    return moment(time).format(cFormat);
  } else {
    return "";
  }
}

// 设置窗体滚动条高度
export function setScrollTop(top) {
  if (document.documentElement) {
    document.documentElement.scrollTop = top;
  } else if (document.body) {
    document.body.scrollTop = top;
  }
}

// 非空判断
export function isNotEmpty(value) {
  return value !== undefined && value !== "" && value !== null;
}

// 获取URL参数
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

// 格式化HTML文本数据
export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

// merge对象
export function objectMerge(target, source) {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property];
      if (typeof sourceProperty === "object") {
        target[property] = objectMerge(target[property], sourceProperty);
        continue;
      }
      target[property] = sourceProperty;
    }
  }
  return target;
}

// 滚动条定位
export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

// 添加删除样式
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

// 延时调用
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

// 数据深拷
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === "object") {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

// 数据深拷
// export function deepClone(data) {
//   const type = checkedType(data);
//   let result;
//   if (type === "Array") {
//     result = [];
//   } else if (type === "Object") {
//     result = {};
//   } else {
//     return data;
//   }
//   if (type === "Array") {
//     for (let i = 0, len = data.length; i < len; i++) {
//       result.push(deepClone(data[i]));
//     }
//   } else if (type === "Object") {
//     // 对原型上的方法也拷贝了....
//     for (const key in data) {
//       result[key] = deepClone(data[key]);
//     }
//   }
//   return result;
// }

// 定义检测数据类型的功能函数
// function checkedType(target) {
//   return Object.prototype.toString.call(target).slice(8, -1);
// }

// 监听事件
export function addEvent(el, type, fn, capture) {
  if (window.addEventListener) {
    if (type === "mousewheel" && document.mozHidden !== undefined) {
      type = "DOMMouseScroll";
    }
    el.addEventListener(type, fn, !!capture);
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, fn);
  }
}
// 移除事件
export function removeEvent(el, type, fn, capture) {
  if (window.removeEventListener) {
    if (type === "mousewheel" && document.mozHidden !== undefined) {
      type = "DOMMouseScroll";
    }
    el.removeEventListener(type, fn, !!capture);
  } else if (window.detachEvent) {
    el.detachEvent("on" + type, fn);
  }
}

// 解决浮点型计算精度问题
export function formatFloat(f, digit = 2, isNotRound) {
  if (arguments.length === 2 && typeof arguments[1] === "boolean") {
    isNotRound = arguments[1];
    digit = 2;
  }
  if (isNaN(Number(f))) {
    throw new Error("parameters cannot be non-numeric for formatFloat method");
  } else {
    if (typeof f === "string") {
      f = Number(f);
    }
  }
  f = f.toFixed(10);
  let m = Math.pow(10, digit);
  if (isNotRound) {
    return parseInt(f * m, 10) / m;
  }
  let _abs = 1;
  if (f < 0) {
    f = Math.abs(f);
    _abs = -1;
  }
  return (Math.round(f * m, 10) / m) * _abs;
}

// 深冻结
export function deepFreeze(o) {
  var prop, propKey;
  Object.freeze(o);
  for (propKey in o) {
    prop = o[propKey];
    if (
      !o.hasOwnProperty(propKey) ||
      !(typeof prop === "object") ||
      Object.isFrozen(prop)
    ) {
      continue;
    }
    deepFreeze(prop);
  }
}

/**
 * @see 获取随机数
 * @param str 随机数开头字母
 * @param n 随机数个数
 */
export function getRandomNum(str = "", n = 12) {
  if (typeof n === "string") {
    n = Number(n);
  }
  n += 2;
  return str + String(Math.random()).slice(2, n);
}
